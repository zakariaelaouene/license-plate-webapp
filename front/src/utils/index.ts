type ClassName = { [key: string]: boolean } | string;
export type JsonObject = { [Key in string]?: JsonValue };
export interface JsonArray extends Array<JsonValue> {}
type JsonValue = string | number | boolean | JsonObject | JsonArray | null;

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string | null;
  tenants?: number[];
  [other: string]: any;
};

export type Params = {
  pagination: {
    page: number;
    perPage: number;
  };
  where?: JsonObject;
  orderBy?: JsonObject;
  include?: JsonObject;
};

export type DeviceType = {
  id: number;
  name: string;
  deviceProfiles?: DeviceProfile[];
  // createdAt: string;
  // updatedAt: string;
  [other: string]: any;
};

export type DeviceProfile = {
  id: number;
  name: string;
  description?: string;
  logo?: string;
  cridentialsType?: string;
  deviceType?: DeviceType;
  deviceTypeId?: number;
  devices?: Device[];
  decoderId?: number;
  attributes?: JsonObject;
  // createdAt: string;
  // updatedAt: string;
  // protocolId?: number;
  // protocol?: Protocol;
  // decoder?: Decoder;
};

export type Alert = {
  id: number;
  deviceId: number;
  createdAt: string;
  updatedAt: string;
  ackowledge: boolean;
  attributes: {
    [key: string]: string;
  };
  groupId?: number;
  machineId?: number;
  machine?: {
    name: string;
    reference: string;
    type: string;
  };
  group?: {
    name: string;
  };
};
// attributes?: JsonObject;

// id: 3,
// deviceId: 2,
// createdAt: "2023-04-23T22:45:23.958Z",
// updatedAt: "2023-04-22T20:52:01.101Z",
// attributes: {
//   alertType: "Temperature ",
//   alertMessage: "High Temperature",
//   alertLevel: "high",
//   mqttValue: "55",
//   reason: "high",
// },
// ackowledge: false,
// groupId: 4,
// machineId: 7,
// machine: { name: "gdfvx", reference: "gdfvc", type: "gdfbvcx" },
// group: { name: "IP LHD" },
// }

export type LastTelemetry = {
  name: string;
  value: any;
  // id: number;
  // alias?: string;
  // icon?: string;
  // color?: string;
  // show: boolean;
  // deviceId: number;
  // device: Device;
  // createdAt: string;
  // updatedAt: string;
  [other: string]: any;
};

export type Attribute = {
  name: string;
  value: string;
  // id: number;
  // deviceId: number;
  // device: Device;
  // createdAt: string;
  // updatedAt: string;
  [other: string]: any;
};

export type Device = {
  id: number;
  name: string;
  serial: string;
  description?: string;
  credential?: Credential;
  credentialId?: number;
  configuration?: string;
  attributes?: Attribute[];
  lastTelemetries?: LastTelemetry[];
  deviceProfile?: DeviceProfile;
  deviceProfileId?: number;
  firmwareId?: number;
  ip?: string;
  alerts?: Alert[];
  group?: Group;
  groupId?: number;
  tenantId?: number;
  // isOnline: boolean;
  // isdecoded: boolean;
  // isPassive: boolean;
  // createdAt: string;
  // updatedAt: string;
  // firmware?: Firmware;
  // tags?: Tag[];
  // VirtualDevice?: VirtualDevice;
  // virtualDeviceId?: number;
  [other: string]: any;
};

export type Group = {
  id: number;
  name: string;
  type: string;
  attributes?: JsonObject;
  parentId?: number;
  parent?: Group;
  subgroups?: Group[];
  devices?: Device[];
  tenantId?: number;
  count?: {
    devices: number;
  };
  // createdAt: string;
  // updatedAt: string;
  [other: string]: any;
};

export function classNames(...classes: ClassName[]): string {
  return classes
    .map((c) => {
      if (typeof c === "string") {
        return c;
      }
      return Object.keys(c)
        .filter((k) => c[k])
        .join(" ");
    })
    .join(" ");
}

export type LoginState = "idle" | "loading" | "error";

export function toggleFullScreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else if (document.exitFullscreen) document.exitFullscreen();
}

export function stringify(value: any) {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

export function convertParams(params: Params) {
  const {
    pagination: { page, perPage },
    where,
    orderBy,
    include,
  } = params;

  return {
    take: perPage,
    skip: (page - 1) * perPage,
    where: stringify(where),
    orderBy: stringify(orderBy),
    include: stringify(include),
  };
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
