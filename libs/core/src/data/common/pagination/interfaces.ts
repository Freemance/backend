// Prisma Relay Cursor Connection Arguments
export interface Options<Record, Cursor, Node, CustomEdge extends Edge<Node>> {
  getCursor?: (record: Record) => Cursor
  encodeCursor?: (cursor: Cursor) => number
  decodeCursor?: (cursorString: number) => Cursor

  recordToEdge?: (record: Record) => Omit<CustomEdge, 'cursor'>
}

// Prisma Arguments
export interface PrismaFindManyArguments<Cursor> {
  cursor?: Cursor
  take?: number
  skip?: number
}

// Relay Arguments
export interface ConnectionArguments {
  first?: number | null
  after?: number | null
  last?: number | null
  before?: number | null
}

// Relay Response
export interface Connection<T, CustomEdge extends Edge<T> = Edge<T>> {
  edges: Array<CustomEdge>
  pageInfo: PageInfo
  totalCount: number
}

export interface Edge<T> {
  cursor: number
  node: T
}

export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: number
  endCursor?: number
}
