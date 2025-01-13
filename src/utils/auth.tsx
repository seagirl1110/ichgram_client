interface ITokenPayload {
  id: string;
  iat: number;
  exp: number;
}

function getTokenPayload(): ITokenPayload | null {
  const token: string | null = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  try {
    const payload: string = token.split('.')[1];
    const decoded: ITokenPayload = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.log('Invalid token:', error);
    return null;
  }
}

export function isTokenValid(): boolean {
  const decoded: ITokenPayload | null = getTokenPayload();

  if (!decoded) {
    return false;
  }

  return decoded.exp * 1000 > Date.now();
}

export function getUserIdFromToken(): string | null {
  const decoded: ITokenPayload | null = getTokenPayload();

  if (!decoded) {
    return null;
  }

  return decoded.id;
}
