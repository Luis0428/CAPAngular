export interface EnvioRequest{
  nombre: string,
  email: string,
  mensaje: string
}

export interface EnvioResponse{
  token: string
}
