import { Service } from 'typedi'
import {
  ElasticSearchAPILog,
  ElasticSearchAPILogType,
  ElasticSearchErrorLog,
  ElasticSearchErrorLogType,
} from '../libs'

@Service()
export class LogService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    // eslint-disable-next-line no-unused-vars
    private elasticSearchErrorLog: ElasticSearchErrorLog,
    // eslint-disable-next-line no-unused-vars
    private elasticSearchAPILog: ElasticSearchAPILog // eslint-disable-next-line no-empty-function
  ) {}

  public log(data: ElasticSearchAPILogType) {
    this.elasticSearchAPILog.putLog(data)
  }

  public error(data: ElasticSearchErrorLogType) {
    this.elasticSearchErrorLog.putLog(data)
  }
}
