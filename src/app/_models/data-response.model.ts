import {
  JsonObject,
  JsonProperty,
  Any,
} from 'json2typescript';

@JsonObject('ODataResponse')
export class ODataResponse {
  @JsonProperty('Status', Number, true)
  status: number = undefined as any;

  @JsonProperty('@odata.etag', String, true)
  etag: String = undefined as any;

  @JsonProperty('@odata.nextLink', String, true)
  nextLink: String = undefined as any;

  @JsonProperty('@odata.count', Number, true)
  count: number = undefined as any;

  @JsonProperty('Data', Any, true)
  value: any = undefined;
}