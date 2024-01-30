import { RequestParams } from '@elastic/elasticsearch'

import { Service } from 'typedi'
import { ElasticSearch } from './elasticSearch'

const INDEX_NAME = 'server_api_logs'

export type ElasticSearchAPILogType = {
  apiName: string
  method: string
  url: string
  header: Object
  errorMessage?: string
}

@Service()
export class ElasticSearchAPILog extends ElasticSearch<ElasticSearchAPILogType> {
  constructor() {
    super(INDEX_NAME)
  }

  public async putLog(log: ElasticSearchAPILogType): Promise<void> {
    try {
      const bodyData: RequestParams.Index = {
        index: this.INDEX_NAME,
        body: {
          ...log,
          timestamp: new Date(),
        },
      }

      console.log('bodyData:  ', bodyData)

      await this.requestElasticSearch(bodyData)

      console.log('[SUCCESS]: ElasticSearchAPILog putLog method')
    } catch (error) {
      console.log(
        // @ts-ignore
        `[ERROR]:  ElasticSearchAPILog putLog method, error-message=${error.message}`
      )
    }
  }
}
