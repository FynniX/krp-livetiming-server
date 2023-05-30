export type ConfigT = {
  Server: {
    port: number
  },
  Connection: {
    hostname: string,
    port: number,
    password: string,
    logging: boolean
  }
}