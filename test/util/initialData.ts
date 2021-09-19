const tagId = '1'
const tagName = 'Full Stack developer'
const initialData: any = {
  tagConnection: {
    edges: [{ cursor: Number(tagId), node: { id: Number(tagId), name: tagName } }],
    pageInfo: { endCursor: '1', hasNextPage: false, hasPreviousPage: false, startCursor: tagId },
    totalCount: 1,
  },
}

export default (): any => initialData
