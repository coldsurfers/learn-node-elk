import { Service } from 'typedi'
import { RequestParams } from '@elastic/elasticsearch'
import { ElasticSearch } from './elasticSearch'

const INDEX_NAME = 'server_error_logs'

export type ElasticSearchErrorLogType = {
  apiName: string
  method: string
  url: string
  header: Object
  message: string
}

@Service()
export class ElasticSearchErrorLog extends ElasticSearch<ElasticSearchErrorLogType> {
  constructor() {
    super(INDEX_NAME)
  }

  public async putLog(log: ElasticSearchErrorLogType): Promise<void> {
    try {
      const bodyData: RequestParams.Index = {
        index: this.INDEX_NAME,
        body: {
          ...log,
          timestamp: new Date(),
        },
      }

      await this.requestElasticSearch(bodyData)

      console.log('[SUCCESS]: ElasticSerachErrorLog putLog method')
    } catch (e) {
      console.log(
        // @ts-ignore
        `[ERROR]: ElasticSearchErrorLog putLog method, error-message=${e.message}`
      )
    }
  }
}
