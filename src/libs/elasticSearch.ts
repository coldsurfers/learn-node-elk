import { Client, RequestParams } from '@elastic/elasticsearch'

const client = new Client({
  node: 'http://localhost:9200',
})

export abstract class ElasticSearch<T> {
  protected readonly INDEX_NAME: string

  constructor(indexName: string) {
    this.INDEX_NAME = indexName
  }

  // eslint-disable-next-line class-methods-use-this
  protected async requestElasticSearch(bodyData: RequestParams.Index) {
    await client.index(bodyData)
  }

  // eslint-disable-next-line no-unused-vars
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  public abstract async putLog(log: T): Promise<void>
}
