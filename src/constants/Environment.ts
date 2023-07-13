interface Environment {
  Uri: {
    Api: string
    Graphql: string
    Image: String
    Ws: string
  }
  OneSignal: {
    AppId: string
  }
  Google: {
    ApiKey: string
  }
  Youtube: {
    ApiKey: string
  }
}

export const environment: Environment = {
  Uri: {
    Api: `${process.env.NEXT_PUBLIC_BASE_URL}/api/`,
    Graphql: `${process.env.NEXT_PUBLIC_BASE_URL}/graphql/`, //`http${isProd ? 's' : ''}://${Host}/graphql/`, //Config.graphql_url as any,
    Image: '',
    Ws: '',
  },
  OneSignal: {
    AppId: 'xxxx',
  },
  Youtube: {
    ApiKey: 'xxxx',
  },
  Google: {
    ApiKey: 'xxxx',
  },
}
