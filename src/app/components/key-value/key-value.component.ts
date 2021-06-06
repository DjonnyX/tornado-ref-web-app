import { Component, Input, OnInit } from '@angular/core';

enum KeyValueCompiledValueTypes {
  COLOR,
  STRING,
  ASSET,
  LINK,
}

interface IKeyValueCompiledData extends IKeyValue {
  type?: KeyValueCompiledValueTypes;
}

const COLOR_PATTERN = /^(rgb\(.*\)|rgba\(.*\)|#.{3,8}|black|silver|gray|white|maroon|red|purple|fuchsia|green|lime|olive|yellow|navy|blue|teal|aqua|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey)$/;
const ASSET_PATTERN = /^(assets\/).*/;

export interface IKeyValue {
  key: string;
  value: string;
  link?: Array<any>;
}

@Component({
  selector: 'ta-key-value',
  templateUrl: './key-value.component.html',
  styleUrls: ['./key-value.component.scss']
})
export class KeyValueComponent implements OnInit {
  public readonly KeyValueCompiledValueTypes = KeyValueCompiledValueTypes;

  private _compiledData: IKeyValueCompiledData;
  get compiledData() { return this._compiledData; }

  @Input() set data(v: IKeyValue) {
    if (this._compiledData !== v) {
      let type: KeyValueCompiledValueTypes;
      if (COLOR_PATTERN.test(v.value)) {
        type = KeyValueCompiledValueTypes.COLOR;
      } else if (ASSET_PATTERN.test(v.value)) {
        type = KeyValueCompiledValueTypes.ASSET;
      } else {
        type = KeyValueCompiledValueTypes.STRING;
      }
      this._compiledData = { ...v, type };
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
