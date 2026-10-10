
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Preset
 * 
 */
export type Preset = $Result.DefaultSelection<Prisma.$PresetPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model TagOnPreset
 * 
 */
export type TagOnPreset = $Result.DefaultSelection<Prisma.$TagOnPresetPayload>
/**
 * Model DownloadHistory
 * 
 */
export type DownloadHistory = $Result.DefaultSelection<Prisma.$DownloadHistoryPayload>
/**
 * Model Like
 * 
 */
export type Like = $Result.DefaultSelection<Prisma.$LikePayload>
/**
 * Model Favorite
 * 
 */
export type Favorite = $Result.DefaultSelection<Prisma.$FavoritePayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model Donation
 * 
 */
export type Donation = $Result.DefaultSelection<Prisma.$DonationPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.preset`: Exposes CRUD operations for the **Preset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Presets
    * const presets = await prisma.preset.findMany()
    * ```
    */
  get preset(): Prisma.PresetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tagOnPreset`: Exposes CRUD operations for the **TagOnPreset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TagOnPresets
    * const tagOnPresets = await prisma.tagOnPreset.findMany()
    * ```
    */
  get tagOnPreset(): Prisma.TagOnPresetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.downloadHistory`: Exposes CRUD operations for the **DownloadHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DownloadHistories
    * const downloadHistories = await prisma.downloadHistory.findMany()
    * ```
    */
  get downloadHistory(): Prisma.DownloadHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.like`: Exposes CRUD operations for the **Like** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Likes
    * const likes = await prisma.like.findMany()
    * ```
    */
  get like(): Prisma.LikeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.favorite`: Exposes CRUD operations for the **Favorite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Favorites
    * const favorites = await prisma.favorite.findMany()
    * ```
    */
  get favorite(): Prisma.FavoriteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.donation`: Exposes CRUD operations for the **Donation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Donations
    * const donations = await prisma.donation.findMany()
    * ```
    */
  get donation(): Prisma.DonationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Preset: 'Preset',
    Tag: 'Tag',
    TagOnPreset: 'TagOnPreset',
    DownloadHistory: 'DownloadHistory',
    Like: 'Like',
    Favorite: 'Favorite',
    Comment: 'Comment',
    Donation: 'Donation',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "preset" | "tag" | "tagOnPreset" | "downloadHistory" | "like" | "favorite" | "comment" | "donation" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Preset: {
        payload: Prisma.$PresetPayload<ExtArgs>
        fields: Prisma.PresetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PresetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PresetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresetPayload>
          }
          findFirst: {
            args: Prisma.PresetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PresetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresetPayload>
          }
          findMany: {
            args: Prisma.PresetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresetPayload>[]
          }
          create: {
            args: Prisma.PresetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresetPayload>
          }
          createMany: {
            args: Prisma.PresetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PresetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresetPayload>
          }
          update: {
            args: Prisma.PresetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresetPayload>
          }
          deleteMany: {
            args: Prisma.PresetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PresetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PresetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresetPayload>
          }
          aggregate: {
            args: Prisma.PresetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePreset>
          }
          groupBy: {
            args: Prisma.PresetGroupByArgs<ExtArgs>
            result: $Utils.Optional<PresetGroupByOutputType>[]
          }
          count: {
            args: Prisma.PresetCountArgs<ExtArgs>
            result: $Utils.Optional<PresetCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      TagOnPreset: {
        payload: Prisma.$TagOnPresetPayload<ExtArgs>
        fields: Prisma.TagOnPresetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagOnPresetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagOnPresetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagOnPresetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagOnPresetPayload>
          }
          findFirst: {
            args: Prisma.TagOnPresetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagOnPresetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagOnPresetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagOnPresetPayload>
          }
          findMany: {
            args: Prisma.TagOnPresetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagOnPresetPayload>[]
          }
          create: {
            args: Prisma.TagOnPresetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagOnPresetPayload>
          }
          createMany: {
            args: Prisma.TagOnPresetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TagOnPresetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagOnPresetPayload>
          }
          update: {
            args: Prisma.TagOnPresetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagOnPresetPayload>
          }
          deleteMany: {
            args: Prisma.TagOnPresetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagOnPresetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TagOnPresetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagOnPresetPayload>
          }
          aggregate: {
            args: Prisma.TagOnPresetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTagOnPreset>
          }
          groupBy: {
            args: Prisma.TagOnPresetGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagOnPresetGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagOnPresetCountArgs<ExtArgs>
            result: $Utils.Optional<TagOnPresetCountAggregateOutputType> | number
          }
        }
      }
      DownloadHistory: {
        payload: Prisma.$DownloadHistoryPayload<ExtArgs>
        fields: Prisma.DownloadHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DownloadHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DownloadHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadHistoryPayload>
          }
          findFirst: {
            args: Prisma.DownloadHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DownloadHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadHistoryPayload>
          }
          findMany: {
            args: Prisma.DownloadHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadHistoryPayload>[]
          }
          create: {
            args: Prisma.DownloadHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadHistoryPayload>
          }
          createMany: {
            args: Prisma.DownloadHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DownloadHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadHistoryPayload>
          }
          update: {
            args: Prisma.DownloadHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadHistoryPayload>
          }
          deleteMany: {
            args: Prisma.DownloadHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DownloadHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DownloadHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadHistoryPayload>
          }
          aggregate: {
            args: Prisma.DownloadHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDownloadHistory>
          }
          groupBy: {
            args: Prisma.DownloadHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DownloadHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.DownloadHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<DownloadHistoryCountAggregateOutputType> | number
          }
        }
      }
      Like: {
        payload: Prisma.$LikePayload<ExtArgs>
        fields: Prisma.LikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          findFirst: {
            args: Prisma.LikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          findMany: {
            args: Prisma.LikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>[]
          }
          create: {
            args: Prisma.LikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          createMany: {
            args: Prisma.LikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          update: {
            args: Prisma.LikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          deleteMany: {
            args: Prisma.LikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          aggregate: {
            args: Prisma.LikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLike>
          }
          groupBy: {
            args: Prisma.LikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<LikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.LikeCountArgs<ExtArgs>
            result: $Utils.Optional<LikeCountAggregateOutputType> | number
          }
        }
      }
      Favorite: {
        payload: Prisma.$FavoritePayload<ExtArgs>
        fields: Prisma.FavoriteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FavoriteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FavoriteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          findFirst: {
            args: Prisma.FavoriteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FavoriteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          findMany: {
            args: Prisma.FavoriteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          create: {
            args: Prisma.FavoriteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          createMany: {
            args: Prisma.FavoriteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FavoriteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          update: {
            args: Prisma.FavoriteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          deleteMany: {
            args: Prisma.FavoriteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FavoriteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FavoriteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          aggregate: {
            args: Prisma.FavoriteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFavorite>
          }
          groupBy: {
            args: Prisma.FavoriteGroupByArgs<ExtArgs>
            result: $Utils.Optional<FavoriteGroupByOutputType>[]
          }
          count: {
            args: Prisma.FavoriteCountArgs<ExtArgs>
            result: $Utils.Optional<FavoriteCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      Donation: {
        payload: Prisma.$DonationPayload<ExtArgs>
        fields: Prisma.DonationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DonationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DonationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          findFirst: {
            args: Prisma.DonationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DonationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          findMany: {
            args: Prisma.DonationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>[]
          }
          create: {
            args: Prisma.DonationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          createMany: {
            args: Prisma.DonationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DonationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          update: {
            args: Prisma.DonationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          deleteMany: {
            args: Prisma.DonationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DonationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DonationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DonationPayload>
          }
          aggregate: {
            args: Prisma.DonationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDonation>
          }
          groupBy: {
            args: Prisma.DonationGroupByArgs<ExtArgs>
            result: $Utils.Optional<DonationGroupByOutputType>[]
          }
          count: {
            args: Prisma.DonationCountArgs<ExtArgs>
            result: $Utils.Optional<DonationCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    preset?: PresetOmit
    tag?: TagOmit
    tagOnPreset?: TagOnPresetOmit
    downloadHistory?: DownloadHistoryOmit
    like?: LikeOmit
    favorite?: FavoriteOmit
    comment?: CommentOmit
    donation?: DonationOmit
    notification?: NotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    presets: number
    comments: number
    downloads: number
    likes: number
    favorites: number
    donations: number
    receivedDonations: number
    notifications: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presets?: boolean | UserCountOutputTypeCountPresetsArgs
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
    downloads?: boolean | UserCountOutputTypeCountDownloadsArgs
    likes?: boolean | UserCountOutputTypeCountLikesArgs
    favorites?: boolean | UserCountOutputTypeCountFavoritesArgs
    donations?: boolean | UserCountOutputTypeCountDonationsArgs
    receivedDonations?: boolean | UserCountOutputTypeCountReceivedDonationsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPresetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PresetWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDownloadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DownloadHistoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDonationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedDonationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type PresetCountOutputType
   */

  export type PresetCountOutputType = {
    tags: number
    comments: number
    downloadsLog: number
    likes: number
    favorites: number
    donations: number
  }

  export type PresetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | PresetCountOutputTypeCountTagsArgs
    comments?: boolean | PresetCountOutputTypeCountCommentsArgs
    downloadsLog?: boolean | PresetCountOutputTypeCountDownloadsLogArgs
    likes?: boolean | PresetCountOutputTypeCountLikesArgs
    favorites?: boolean | PresetCountOutputTypeCountFavoritesArgs
    donations?: boolean | PresetCountOutputTypeCountDonationsArgs
  }

  // Custom InputTypes
  /**
   * PresetCountOutputType without action
   */
  export type PresetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PresetCountOutputType
     */
    select?: PresetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PresetCountOutputType without action
   */
  export type PresetCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagOnPresetWhereInput
  }

  /**
   * PresetCountOutputType without action
   */
  export type PresetCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * PresetCountOutputType without action
   */
  export type PresetCountOutputTypeCountDownloadsLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DownloadHistoryWhereInput
  }

  /**
   * PresetCountOutputType without action
   */
  export type PresetCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LikeWhereInput
  }

  /**
   * PresetCountOutputType without action
   */
  export type PresetCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }

  /**
   * PresetCountOutputType without action
   */
  export type PresetCountOutputTypeCountDonationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    presets: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presets?: boolean | TagCountOutputTypeCountPresetsArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountPresetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagOnPresetWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    avatar: string | null
    bio: string | null
    role: string | null
    mustChangePassword: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    avatar: string | null
    bio: string | null
    role: string | null
    mustChangePassword: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    avatar: number
    bio: number
    role: number
    mustChangePassword: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    avatar?: true
    bio?: true
    role?: true
    mustChangePassword?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    avatar?: true
    bio?: true
    role?: true
    mustChangePassword?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    avatar?: true
    bio?: true
    role?: true
    mustChangePassword?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    avatar: string | null
    bio: string | null
    role: string
    mustChangePassword: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    avatar?: boolean
    bio?: boolean
    role?: boolean
    mustChangePassword?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    presets?: boolean | User$presetsArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    downloads?: boolean | User$downloadsArgs<ExtArgs>
    likes?: boolean | User$likesArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    donations?: boolean | User$donationsArgs<ExtArgs>
    receivedDonations?: boolean | User$receivedDonationsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    avatar?: boolean
    bio?: boolean
    role?: boolean
    mustChangePassword?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "avatar" | "bio" | "role" | "mustChangePassword" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presets?: boolean | User$presetsArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    downloads?: boolean | User$downloadsArgs<ExtArgs>
    likes?: boolean | User$likesArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    donations?: boolean | User$donationsArgs<ExtArgs>
    receivedDonations?: boolean | User$receivedDonationsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      presets: Prisma.$PresetPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      downloads: Prisma.$DownloadHistoryPayload<ExtArgs>[]
      likes: Prisma.$LikePayload<ExtArgs>[]
      favorites: Prisma.$FavoritePayload<ExtArgs>[]
      donations: Prisma.$DonationPayload<ExtArgs>[]
      receivedDonations: Prisma.$DonationPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
      avatar: string | null
      bio: string | null
      role: string
      mustChangePassword: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    presets<T extends User$presetsArgs<ExtArgs> = {}>(args?: Subset<T, User$presetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    downloads<T extends User$downloadsArgs<ExtArgs> = {}>(args?: Subset<T, User$downloadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DownloadHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends User$likesArgs<ExtArgs> = {}>(args?: Subset<T, User$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favorites<T extends User$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, User$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    donations<T extends User$donationsArgs<ExtArgs> = {}>(args?: Subset<T, User$donationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedDonations<T extends User$receivedDonationsArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedDonationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly mustChangePassword: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.presets
   */
  export type User$presetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preset
     */
    select?: PresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preset
     */
    omit?: PresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresetInclude<ExtArgs> | null
    where?: PresetWhereInput
    orderBy?: PresetOrderByWithRelationInput | PresetOrderByWithRelationInput[]
    cursor?: PresetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PresetScalarFieldEnum | PresetScalarFieldEnum[]
  }

  /**
   * User.comments
   */
  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * User.downloads
   */
  export type User$downloadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadHistory
     */
    select?: DownloadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadHistory
     */
    omit?: DownloadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadHistoryInclude<ExtArgs> | null
    where?: DownloadHistoryWhereInput
    orderBy?: DownloadHistoryOrderByWithRelationInput | DownloadHistoryOrderByWithRelationInput[]
    cursor?: DownloadHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DownloadHistoryScalarFieldEnum | DownloadHistoryScalarFieldEnum[]
  }

  /**
   * User.likes
   */
  export type User$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    where?: LikeWhereInput
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    cursor?: LikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * User.favorites
   */
  export type User$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * User.donations
   */
  export type User$donationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    where?: DonationWhereInput
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    cursor?: DonationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * User.receivedDonations
   */
  export type User$receivedDonationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    where?: DonationWhereInput
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    cursor?: DonationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Preset
   */

  export type AggregatePreset = {
    _count: PresetCountAggregateOutputType | null
    _avg: PresetAvgAggregateOutputType | null
    _sum: PresetSumAggregateOutputType | null
    _min: PresetMinAggregateOutputType | null
    _max: PresetMaxAggregateOutputType | null
  }

  export type PresetAvgAggregateOutputType = {
    id: number | null
    fileSize: number | null
    downloads: number | null
    likesCount: number | null
    favoritesCount: number | null
    userId: number | null
  }

  export type PresetSumAggregateOutputType = {
    id: number | null
    fileSize: number | null
    downloads: number | null
    likesCount: number | null
    favoritesCount: number | null
    userId: number | null
  }

  export type PresetMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    daw: string | null
    format: string | null
    filePath: string | null
    fileSize: number | null
    coverImage: string | null
    downloads: number | null
    likesCount: number | null
    favoritesCount: number | null
    isPublic: boolean | null
    previewAudio: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
  }

  export type PresetMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    daw: string | null
    format: string | null
    filePath: string | null
    fileSize: number | null
    coverImage: string | null
    downloads: number | null
    likesCount: number | null
    favoritesCount: number | null
    isPublic: boolean | null
    previewAudio: string | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
  }

  export type PresetCountAggregateOutputType = {
    id: number
    title: number
    description: number
    daw: number
    format: number
    filePath: number
    fileSize: number
    files: number
    coverImage: number
    downloads: number
    likesCount: number
    favoritesCount: number
    isPublic: number
    previewAudio: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type PresetAvgAggregateInputType = {
    id?: true
    fileSize?: true
    downloads?: true
    likesCount?: true
    favoritesCount?: true
    userId?: true
  }

  export type PresetSumAggregateInputType = {
    id?: true
    fileSize?: true
    downloads?: true
    likesCount?: true
    favoritesCount?: true
    userId?: true
  }

  export type PresetMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    daw?: true
    format?: true
    filePath?: true
    fileSize?: true
    coverImage?: true
    downloads?: true
    likesCount?: true
    favoritesCount?: true
    isPublic?: true
    previewAudio?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type PresetMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    daw?: true
    format?: true
    filePath?: true
    fileSize?: true
    coverImage?: true
    downloads?: true
    likesCount?: true
    favoritesCount?: true
    isPublic?: true
    previewAudio?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type PresetCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    daw?: true
    format?: true
    filePath?: true
    fileSize?: true
    files?: true
    coverImage?: true
    downloads?: true
    likesCount?: true
    favoritesCount?: true
    isPublic?: true
    previewAudio?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type PresetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Preset to aggregate.
     */
    where?: PresetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presets to fetch.
     */
    orderBy?: PresetOrderByWithRelationInput | PresetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PresetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Presets
    **/
    _count?: true | PresetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PresetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PresetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PresetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PresetMaxAggregateInputType
  }

  export type GetPresetAggregateType<T extends PresetAggregateArgs> = {
        [P in keyof T & keyof AggregatePreset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreset[P]>
      : GetScalarType<T[P], AggregatePreset[P]>
  }




  export type PresetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PresetWhereInput
    orderBy?: PresetOrderByWithAggregationInput | PresetOrderByWithAggregationInput[]
    by: PresetScalarFieldEnum[] | PresetScalarFieldEnum
    having?: PresetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PresetCountAggregateInputType | true
    _avg?: PresetAvgAggregateInputType
    _sum?: PresetSumAggregateInputType
    _min?: PresetMinAggregateInputType
    _max?: PresetMaxAggregateInputType
  }

  export type PresetGroupByOutputType = {
    id: number
    title: string
    description: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files: JsonValue | null
    coverImage: string | null
    downloads: number
    likesCount: number
    favoritesCount: number
    isPublic: boolean
    previewAudio: string | null
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    userId: number
    _count: PresetCountAggregateOutputType | null
    _avg: PresetAvgAggregateOutputType | null
    _sum: PresetSumAggregateOutputType | null
    _min: PresetMinAggregateOutputType | null
    _max: PresetMaxAggregateOutputType | null
  }

  type GetPresetGroupByPayload<T extends PresetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PresetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PresetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PresetGroupByOutputType[P]>
            : GetScalarType<T[P], PresetGroupByOutputType[P]>
        }
      >
    >


  export type PresetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    daw?: boolean
    format?: boolean
    filePath?: boolean
    fileSize?: boolean
    files?: boolean
    coverImage?: boolean
    downloads?: boolean
    likesCount?: boolean
    favoritesCount?: boolean
    isPublic?: boolean
    previewAudio?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    tags?: boolean | Preset$tagsArgs<ExtArgs>
    comments?: boolean | Preset$commentsArgs<ExtArgs>
    downloadsLog?: boolean | Preset$downloadsLogArgs<ExtArgs>
    likes?: boolean | Preset$likesArgs<ExtArgs>
    favorites?: boolean | Preset$favoritesArgs<ExtArgs>
    donations?: boolean | Preset$donationsArgs<ExtArgs>
    _count?: boolean | PresetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preset"]>



  export type PresetSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    daw?: boolean
    format?: boolean
    filePath?: boolean
    fileSize?: boolean
    files?: boolean
    coverImage?: boolean
    downloads?: boolean
    likesCount?: boolean
    favoritesCount?: boolean
    isPublic?: boolean
    previewAudio?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type PresetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "daw" | "format" | "filePath" | "fileSize" | "files" | "coverImage" | "downloads" | "likesCount" | "favoritesCount" | "isPublic" | "previewAudio" | "deletedAt" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["preset"]>
  export type PresetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    tags?: boolean | Preset$tagsArgs<ExtArgs>
    comments?: boolean | Preset$commentsArgs<ExtArgs>
    downloadsLog?: boolean | Preset$downloadsLogArgs<ExtArgs>
    likes?: boolean | Preset$likesArgs<ExtArgs>
    favorites?: boolean | Preset$favoritesArgs<ExtArgs>
    donations?: boolean | Preset$donationsArgs<ExtArgs>
    _count?: boolean | PresetCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PresetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Preset"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      tags: Prisma.$TagOnPresetPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      downloadsLog: Prisma.$DownloadHistoryPayload<ExtArgs>[]
      likes: Prisma.$LikePayload<ExtArgs>[]
      favorites: Prisma.$FavoritePayload<ExtArgs>[]
      donations: Prisma.$DonationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      daw: string
      format: string
      filePath: string
      fileSize: number
      files: Prisma.JsonValue | null
      coverImage: string | null
      downloads: number
      likesCount: number
      favoritesCount: number
      isPublic: boolean
      previewAudio: string | null
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
      userId: number
    }, ExtArgs["result"]["preset"]>
    composites: {}
  }

  type PresetGetPayload<S extends boolean | null | undefined | PresetDefaultArgs> = $Result.GetResult<Prisma.$PresetPayload, S>

  type PresetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PresetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PresetCountAggregateInputType | true
    }

  export interface PresetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Preset'], meta: { name: 'Preset' } }
    /**
     * Find zero or one Preset that matches the filter.
     * @param {PresetFindUniqueArgs} args - Arguments to find a Preset
     * @example
     * // Get one Preset
     * const preset = await prisma.preset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PresetFindUniqueArgs>(args: SelectSubset<T, PresetFindUniqueArgs<ExtArgs>>): Prisma__PresetClient<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Preset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PresetFindUniqueOrThrowArgs} args - Arguments to find a Preset
     * @example
     * // Get one Preset
     * const preset = await prisma.preset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PresetFindUniqueOrThrowArgs>(args: SelectSubset<T, PresetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PresetClient<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Preset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresetFindFirstArgs} args - Arguments to find a Preset
     * @example
     * // Get one Preset
     * const preset = await prisma.preset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PresetFindFirstArgs>(args?: SelectSubset<T, PresetFindFirstArgs<ExtArgs>>): Prisma__PresetClient<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Preset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresetFindFirstOrThrowArgs} args - Arguments to find a Preset
     * @example
     * // Get one Preset
     * const preset = await prisma.preset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PresetFindFirstOrThrowArgs>(args?: SelectSubset<T, PresetFindFirstOrThrowArgs<ExtArgs>>): Prisma__PresetClient<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Presets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Presets
     * const presets = await prisma.preset.findMany()
     * 
     * // Get first 10 Presets
     * const presets = await prisma.preset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const presetWithIdOnly = await prisma.preset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PresetFindManyArgs>(args?: SelectSubset<T, PresetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Preset.
     * @param {PresetCreateArgs} args - Arguments to create a Preset.
     * @example
     * // Create one Preset
     * const Preset = await prisma.preset.create({
     *   data: {
     *     // ... data to create a Preset
     *   }
     * })
     * 
     */
    create<T extends PresetCreateArgs>(args: SelectSubset<T, PresetCreateArgs<ExtArgs>>): Prisma__PresetClient<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Presets.
     * @param {PresetCreateManyArgs} args - Arguments to create many Presets.
     * @example
     * // Create many Presets
     * const preset = await prisma.preset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PresetCreateManyArgs>(args?: SelectSubset<T, PresetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Preset.
     * @param {PresetDeleteArgs} args - Arguments to delete one Preset.
     * @example
     * // Delete one Preset
     * const Preset = await prisma.preset.delete({
     *   where: {
     *     // ... filter to delete one Preset
     *   }
     * })
     * 
     */
    delete<T extends PresetDeleteArgs>(args: SelectSubset<T, PresetDeleteArgs<ExtArgs>>): Prisma__PresetClient<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Preset.
     * @param {PresetUpdateArgs} args - Arguments to update one Preset.
     * @example
     * // Update one Preset
     * const preset = await prisma.preset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PresetUpdateArgs>(args: SelectSubset<T, PresetUpdateArgs<ExtArgs>>): Prisma__PresetClient<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Presets.
     * @param {PresetDeleteManyArgs} args - Arguments to filter Presets to delete.
     * @example
     * // Delete a few Presets
     * const { count } = await prisma.preset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PresetDeleteManyArgs>(args?: SelectSubset<T, PresetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Presets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Presets
     * const preset = await prisma.preset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PresetUpdateManyArgs>(args: SelectSubset<T, PresetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Preset.
     * @param {PresetUpsertArgs} args - Arguments to update or create a Preset.
     * @example
     * // Update or create a Preset
     * const preset = await prisma.preset.upsert({
     *   create: {
     *     // ... data to create a Preset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Preset we want to update
     *   }
     * })
     */
    upsert<T extends PresetUpsertArgs>(args: SelectSubset<T, PresetUpsertArgs<ExtArgs>>): Prisma__PresetClient<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Presets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresetCountArgs} args - Arguments to filter Presets to count.
     * @example
     * // Count the number of Presets
     * const count = await prisma.preset.count({
     *   where: {
     *     // ... the filter for the Presets we want to count
     *   }
     * })
    **/
    count<T extends PresetCountArgs>(
      args?: Subset<T, PresetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PresetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Preset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PresetAggregateArgs>(args: Subset<T, PresetAggregateArgs>): Prisma.PrismaPromise<GetPresetAggregateType<T>>

    /**
     * Group by Preset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PresetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PresetGroupByArgs['orderBy'] }
        : { orderBy?: PresetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PresetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPresetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Preset model
   */
  readonly fields: PresetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Preset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PresetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tags<T extends Preset$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Preset$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagOnPresetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Preset$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Preset$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    downloadsLog<T extends Preset$downloadsLogArgs<ExtArgs> = {}>(args?: Subset<T, Preset$downloadsLogArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DownloadHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends Preset$likesArgs<ExtArgs> = {}>(args?: Subset<T, Preset$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favorites<T extends Preset$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, Preset$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    donations<T extends Preset$donationsArgs<ExtArgs> = {}>(args?: Subset<T, Preset$donationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Preset model
   */
  interface PresetFieldRefs {
    readonly id: FieldRef<"Preset", 'Int'>
    readonly title: FieldRef<"Preset", 'String'>
    readonly description: FieldRef<"Preset", 'String'>
    readonly daw: FieldRef<"Preset", 'String'>
    readonly format: FieldRef<"Preset", 'String'>
    readonly filePath: FieldRef<"Preset", 'String'>
    readonly fileSize: FieldRef<"Preset", 'Int'>
    readonly files: FieldRef<"Preset", 'Json'>
    readonly coverImage: FieldRef<"Preset", 'String'>
    readonly downloads: FieldRef<"Preset", 'Int'>
    readonly likesCount: FieldRef<"Preset", 'Int'>
    readonly favoritesCount: FieldRef<"Preset", 'Int'>
    readonly isPublic: FieldRef<"Preset", 'Boolean'>
    readonly previewAudio: FieldRef<"Preset", 'String'>
    readonly deletedAt: FieldRef<"Preset", 'DateTime'>
    readonly createdAt: FieldRef<"Preset", 'DateTime'>
    readonly updatedAt: FieldRef<"Preset", 'DateTime'>
    readonly userId: FieldRef<"Preset", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Preset findUnique
   */
  export type PresetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preset
     */
    select?: PresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preset
     */
    omit?: PresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresetInclude<ExtArgs> | null
    /**
     * Filter, which Preset to fetch.
     */
    where: PresetWhereUniqueInput
  }

  /**
   * Preset findUniqueOrThrow
   */
  export type PresetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preset
     */
    select?: PresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preset
     */
    omit?: PresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresetInclude<ExtArgs> | null
    /**
     * Filter, which Preset to fetch.
     */
    where: PresetWhereUniqueInput
  }

  /**
   * Preset findFirst
   */
  export type PresetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preset
     */
    select?: PresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preset
     */
    omit?: PresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresetInclude<ExtArgs> | null
    /**
     * Filter, which Preset to fetch.
     */
    where?: PresetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presets to fetch.
     */
    orderBy?: PresetOrderByWithRelationInput | PresetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Presets.
     */
    cursor?: PresetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Presets.
     */
    distinct?: PresetScalarFieldEnum | PresetScalarFieldEnum[]
  }

  /**
   * Preset findFirstOrThrow
   */
  export type PresetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preset
     */
    select?: PresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preset
     */
    omit?: PresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresetInclude<ExtArgs> | null
    /**
     * Filter, which Preset to fetch.
     */
    where?: PresetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presets to fetch.
     */
    orderBy?: PresetOrderByWithRelationInput | PresetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Presets.
     */
    cursor?: PresetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Presets.
     */
    distinct?: PresetScalarFieldEnum | PresetScalarFieldEnum[]
  }

  /**
   * Preset findMany
   */
  export type PresetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preset
     */
    select?: PresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preset
     */
    omit?: PresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresetInclude<ExtArgs> | null
    /**
     * Filter, which Presets to fetch.
     */
    where?: PresetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presets to fetch.
     */
    orderBy?: PresetOrderByWithRelationInput | PresetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Presets.
     */
    cursor?: PresetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presets.
     */
    skip?: number
    distinct?: PresetScalarFieldEnum | PresetScalarFieldEnum[]
  }

  /**
   * Preset create
   */
  export type PresetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preset
     */
    select?: PresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preset
     */
    omit?: PresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresetInclude<ExtArgs> | null
    /**
     * The data needed to create a Preset.
     */
    data: XOR<PresetCreateInput, PresetUncheckedCreateInput>
  }

  /**
   * Preset createMany
   */
  export type PresetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Presets.
     */
    data: PresetCreateManyInput | PresetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Preset update
   */
  export type PresetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preset
     */
    select?: PresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preset
     */
    omit?: PresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresetInclude<ExtArgs> | null
    /**
     * The data needed to update a Preset.
     */
    data: XOR<PresetUpdateInput, PresetUncheckedUpdateInput>
    /**
     * Choose, which Preset to update.
     */
    where: PresetWhereUniqueInput
  }

  /**
   * Preset updateMany
   */
  export type PresetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Presets.
     */
    data: XOR<PresetUpdateManyMutationInput, PresetUncheckedUpdateManyInput>
    /**
     * Filter which Presets to update
     */
    where?: PresetWhereInput
    /**
     * Limit how many Presets to update.
     */
    limit?: number
  }

  /**
   * Preset upsert
   */
  export type PresetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preset
     */
    select?: PresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preset
     */
    omit?: PresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresetInclude<ExtArgs> | null
    /**
     * The filter to search for the Preset to update in case it exists.
     */
    where: PresetWhereUniqueInput
    /**
     * In case the Preset found by the `where` argument doesn't exist, create a new Preset with this data.
     */
    create: XOR<PresetCreateInput, PresetUncheckedCreateInput>
    /**
     * In case the Preset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PresetUpdateInput, PresetUncheckedUpdateInput>
  }

  /**
   * Preset delete
   */
  export type PresetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preset
     */
    select?: PresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preset
     */
    omit?: PresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresetInclude<ExtArgs> | null
    /**
     * Filter which Preset to delete.
     */
    where: PresetWhereUniqueInput
  }

  /**
   * Preset deleteMany
   */
  export type PresetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Presets to delete
     */
    where?: PresetWhereInput
    /**
     * Limit how many Presets to delete.
     */
    limit?: number
  }

  /**
   * Preset.tags
   */
  export type Preset$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagOnPreset
     */
    select?: TagOnPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TagOnPreset
     */
    omit?: TagOnPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagOnPresetInclude<ExtArgs> | null
    where?: TagOnPresetWhereInput
    orderBy?: TagOnPresetOrderByWithRelationInput | TagOnPresetOrderByWithRelationInput[]
    cursor?: TagOnPresetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagOnPresetScalarFieldEnum | TagOnPresetScalarFieldEnum[]
  }

  /**
   * Preset.comments
   */
  export type Preset$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Preset.downloadsLog
   */
  export type Preset$downloadsLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadHistory
     */
    select?: DownloadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadHistory
     */
    omit?: DownloadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadHistoryInclude<ExtArgs> | null
    where?: DownloadHistoryWhereInput
    orderBy?: DownloadHistoryOrderByWithRelationInput | DownloadHistoryOrderByWithRelationInput[]
    cursor?: DownloadHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DownloadHistoryScalarFieldEnum | DownloadHistoryScalarFieldEnum[]
  }

  /**
   * Preset.likes
   */
  export type Preset$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    where?: LikeWhereInput
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    cursor?: LikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Preset.favorites
   */
  export type Preset$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Preset.donations
   */
  export type Preset$donationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    where?: DonationWhereInput
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    cursor?: DonationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * Preset without action
   */
  export type PresetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preset
     */
    select?: PresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preset
     */
    omit?: PresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresetInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagAvgAggregateOutputType = {
    id: number | null
  }

  export type TagSumAggregateOutputType = {
    id: number | null
  }

  export type TagMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type TagMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type TagAvgAggregateInputType = {
    id?: true
  }

  export type TagSumAggregateInputType = {
    id?: true
  }

  export type TagMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _avg?: TagAvgAggregateInputType
    _sum?: TagSumAggregateInputType
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: number
    name: string
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    presets?: boolean | Tag$presetsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>



  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presets?: boolean | Tag$presetsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      presets: Prisma.$TagOnPresetPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    presets<T extends Tag$presetsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$presetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagOnPresetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'Int'>
    readonly name: FieldRef<"Tag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.presets
   */
  export type Tag$presetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagOnPreset
     */
    select?: TagOnPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TagOnPreset
     */
    omit?: TagOnPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagOnPresetInclude<ExtArgs> | null
    where?: TagOnPresetWhereInput
    orderBy?: TagOnPresetOrderByWithRelationInput | TagOnPresetOrderByWithRelationInput[]
    cursor?: TagOnPresetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagOnPresetScalarFieldEnum | TagOnPresetScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model TagOnPreset
   */

  export type AggregateTagOnPreset = {
    _count: TagOnPresetCountAggregateOutputType | null
    _avg: TagOnPresetAvgAggregateOutputType | null
    _sum: TagOnPresetSumAggregateOutputType | null
    _min: TagOnPresetMinAggregateOutputType | null
    _max: TagOnPresetMaxAggregateOutputType | null
  }

  export type TagOnPresetAvgAggregateOutputType = {
    presetId: number | null
    tagId: number | null
  }

  export type TagOnPresetSumAggregateOutputType = {
    presetId: number | null
    tagId: number | null
  }

  export type TagOnPresetMinAggregateOutputType = {
    presetId: number | null
    tagId: number | null
  }

  export type TagOnPresetMaxAggregateOutputType = {
    presetId: number | null
    tagId: number | null
  }

  export type TagOnPresetCountAggregateOutputType = {
    presetId: number
    tagId: number
    _all: number
  }


  export type TagOnPresetAvgAggregateInputType = {
    presetId?: true
    tagId?: true
  }

  export type TagOnPresetSumAggregateInputType = {
    presetId?: true
    tagId?: true
  }

  export type TagOnPresetMinAggregateInputType = {
    presetId?: true
    tagId?: true
  }

  export type TagOnPresetMaxAggregateInputType = {
    presetId?: true
    tagId?: true
  }

  export type TagOnPresetCountAggregateInputType = {
    presetId?: true
    tagId?: true
    _all?: true
  }

  export type TagOnPresetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TagOnPreset to aggregate.
     */
    where?: TagOnPresetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TagOnPresets to fetch.
     */
    orderBy?: TagOnPresetOrderByWithRelationInput | TagOnPresetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagOnPresetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TagOnPresets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TagOnPresets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TagOnPresets
    **/
    _count?: true | TagOnPresetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TagOnPresetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TagOnPresetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagOnPresetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagOnPresetMaxAggregateInputType
  }

  export type GetTagOnPresetAggregateType<T extends TagOnPresetAggregateArgs> = {
        [P in keyof T & keyof AggregateTagOnPreset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTagOnPreset[P]>
      : GetScalarType<T[P], AggregateTagOnPreset[P]>
  }




  export type TagOnPresetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagOnPresetWhereInput
    orderBy?: TagOnPresetOrderByWithAggregationInput | TagOnPresetOrderByWithAggregationInput[]
    by: TagOnPresetScalarFieldEnum[] | TagOnPresetScalarFieldEnum
    having?: TagOnPresetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagOnPresetCountAggregateInputType | true
    _avg?: TagOnPresetAvgAggregateInputType
    _sum?: TagOnPresetSumAggregateInputType
    _min?: TagOnPresetMinAggregateInputType
    _max?: TagOnPresetMaxAggregateInputType
  }

  export type TagOnPresetGroupByOutputType = {
    presetId: number
    tagId: number
    _count: TagOnPresetCountAggregateOutputType | null
    _avg: TagOnPresetAvgAggregateOutputType | null
    _sum: TagOnPresetSumAggregateOutputType | null
    _min: TagOnPresetMinAggregateOutputType | null
    _max: TagOnPresetMaxAggregateOutputType | null
  }

  type GetTagOnPresetGroupByPayload<T extends TagOnPresetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagOnPresetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagOnPresetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagOnPresetGroupByOutputType[P]>
            : GetScalarType<T[P], TagOnPresetGroupByOutputType[P]>
        }
      >
    >


  export type TagOnPresetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    presetId?: boolean
    tagId?: boolean
    preset?: boolean | PresetDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tagOnPreset"]>



  export type TagOnPresetSelectScalar = {
    presetId?: boolean
    tagId?: boolean
  }

  export type TagOnPresetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"presetId" | "tagId", ExtArgs["result"]["tagOnPreset"]>
  export type TagOnPresetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preset?: boolean | PresetDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $TagOnPresetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TagOnPreset"
    objects: {
      preset: Prisma.$PresetPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      presetId: number
      tagId: number
    }, ExtArgs["result"]["tagOnPreset"]>
    composites: {}
  }

  type TagOnPresetGetPayload<S extends boolean | null | undefined | TagOnPresetDefaultArgs> = $Result.GetResult<Prisma.$TagOnPresetPayload, S>

  type TagOnPresetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagOnPresetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagOnPresetCountAggregateInputType | true
    }

  export interface TagOnPresetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TagOnPreset'], meta: { name: 'TagOnPreset' } }
    /**
     * Find zero or one TagOnPreset that matches the filter.
     * @param {TagOnPresetFindUniqueArgs} args - Arguments to find a TagOnPreset
     * @example
     * // Get one TagOnPreset
     * const tagOnPreset = await prisma.tagOnPreset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagOnPresetFindUniqueArgs>(args: SelectSubset<T, TagOnPresetFindUniqueArgs<ExtArgs>>): Prisma__TagOnPresetClient<$Result.GetResult<Prisma.$TagOnPresetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TagOnPreset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagOnPresetFindUniqueOrThrowArgs} args - Arguments to find a TagOnPreset
     * @example
     * // Get one TagOnPreset
     * const tagOnPreset = await prisma.tagOnPreset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagOnPresetFindUniqueOrThrowArgs>(args: SelectSubset<T, TagOnPresetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagOnPresetClient<$Result.GetResult<Prisma.$TagOnPresetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TagOnPreset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagOnPresetFindFirstArgs} args - Arguments to find a TagOnPreset
     * @example
     * // Get one TagOnPreset
     * const tagOnPreset = await prisma.tagOnPreset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagOnPresetFindFirstArgs>(args?: SelectSubset<T, TagOnPresetFindFirstArgs<ExtArgs>>): Prisma__TagOnPresetClient<$Result.GetResult<Prisma.$TagOnPresetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TagOnPreset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagOnPresetFindFirstOrThrowArgs} args - Arguments to find a TagOnPreset
     * @example
     * // Get one TagOnPreset
     * const tagOnPreset = await prisma.tagOnPreset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagOnPresetFindFirstOrThrowArgs>(args?: SelectSubset<T, TagOnPresetFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagOnPresetClient<$Result.GetResult<Prisma.$TagOnPresetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TagOnPresets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagOnPresetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TagOnPresets
     * const tagOnPresets = await prisma.tagOnPreset.findMany()
     * 
     * // Get first 10 TagOnPresets
     * const tagOnPresets = await prisma.tagOnPreset.findMany({ take: 10 })
     * 
     * // Only select the `presetId`
     * const tagOnPresetWithPresetIdOnly = await prisma.tagOnPreset.findMany({ select: { presetId: true } })
     * 
     */
    findMany<T extends TagOnPresetFindManyArgs>(args?: SelectSubset<T, TagOnPresetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagOnPresetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TagOnPreset.
     * @param {TagOnPresetCreateArgs} args - Arguments to create a TagOnPreset.
     * @example
     * // Create one TagOnPreset
     * const TagOnPreset = await prisma.tagOnPreset.create({
     *   data: {
     *     // ... data to create a TagOnPreset
     *   }
     * })
     * 
     */
    create<T extends TagOnPresetCreateArgs>(args: SelectSubset<T, TagOnPresetCreateArgs<ExtArgs>>): Prisma__TagOnPresetClient<$Result.GetResult<Prisma.$TagOnPresetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TagOnPresets.
     * @param {TagOnPresetCreateManyArgs} args - Arguments to create many TagOnPresets.
     * @example
     * // Create many TagOnPresets
     * const tagOnPreset = await prisma.tagOnPreset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagOnPresetCreateManyArgs>(args?: SelectSubset<T, TagOnPresetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TagOnPreset.
     * @param {TagOnPresetDeleteArgs} args - Arguments to delete one TagOnPreset.
     * @example
     * // Delete one TagOnPreset
     * const TagOnPreset = await prisma.tagOnPreset.delete({
     *   where: {
     *     // ... filter to delete one TagOnPreset
     *   }
     * })
     * 
     */
    delete<T extends TagOnPresetDeleteArgs>(args: SelectSubset<T, TagOnPresetDeleteArgs<ExtArgs>>): Prisma__TagOnPresetClient<$Result.GetResult<Prisma.$TagOnPresetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TagOnPreset.
     * @param {TagOnPresetUpdateArgs} args - Arguments to update one TagOnPreset.
     * @example
     * // Update one TagOnPreset
     * const tagOnPreset = await prisma.tagOnPreset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagOnPresetUpdateArgs>(args: SelectSubset<T, TagOnPresetUpdateArgs<ExtArgs>>): Prisma__TagOnPresetClient<$Result.GetResult<Prisma.$TagOnPresetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TagOnPresets.
     * @param {TagOnPresetDeleteManyArgs} args - Arguments to filter TagOnPresets to delete.
     * @example
     * // Delete a few TagOnPresets
     * const { count } = await prisma.tagOnPreset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagOnPresetDeleteManyArgs>(args?: SelectSubset<T, TagOnPresetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TagOnPresets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagOnPresetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TagOnPresets
     * const tagOnPreset = await prisma.tagOnPreset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagOnPresetUpdateManyArgs>(args: SelectSubset<T, TagOnPresetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TagOnPreset.
     * @param {TagOnPresetUpsertArgs} args - Arguments to update or create a TagOnPreset.
     * @example
     * // Update or create a TagOnPreset
     * const tagOnPreset = await prisma.tagOnPreset.upsert({
     *   create: {
     *     // ... data to create a TagOnPreset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TagOnPreset we want to update
     *   }
     * })
     */
    upsert<T extends TagOnPresetUpsertArgs>(args: SelectSubset<T, TagOnPresetUpsertArgs<ExtArgs>>): Prisma__TagOnPresetClient<$Result.GetResult<Prisma.$TagOnPresetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TagOnPresets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagOnPresetCountArgs} args - Arguments to filter TagOnPresets to count.
     * @example
     * // Count the number of TagOnPresets
     * const count = await prisma.tagOnPreset.count({
     *   where: {
     *     // ... the filter for the TagOnPresets we want to count
     *   }
     * })
    **/
    count<T extends TagOnPresetCountArgs>(
      args?: Subset<T, TagOnPresetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagOnPresetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TagOnPreset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagOnPresetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagOnPresetAggregateArgs>(args: Subset<T, TagOnPresetAggregateArgs>): Prisma.PrismaPromise<GetTagOnPresetAggregateType<T>>

    /**
     * Group by TagOnPreset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagOnPresetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagOnPresetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagOnPresetGroupByArgs['orderBy'] }
        : { orderBy?: TagOnPresetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagOnPresetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagOnPresetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TagOnPreset model
   */
  readonly fields: TagOnPresetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TagOnPreset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagOnPresetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    preset<T extends PresetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PresetDefaultArgs<ExtArgs>>): Prisma__PresetClient<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TagOnPreset model
   */
  interface TagOnPresetFieldRefs {
    readonly presetId: FieldRef<"TagOnPreset", 'Int'>
    readonly tagId: FieldRef<"TagOnPreset", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TagOnPreset findUnique
   */
  export type TagOnPresetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagOnPreset
     */
    select?: TagOnPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TagOnPreset
     */
    omit?: TagOnPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagOnPresetInclude<ExtArgs> | null
    /**
     * Filter, which TagOnPreset to fetch.
     */
    where: TagOnPresetWhereUniqueInput
  }

  /**
   * TagOnPreset findUniqueOrThrow
   */
  export type TagOnPresetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagOnPreset
     */
    select?: TagOnPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TagOnPreset
     */
    omit?: TagOnPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagOnPresetInclude<ExtArgs> | null
    /**
     * Filter, which TagOnPreset to fetch.
     */
    where: TagOnPresetWhereUniqueInput
  }

  /**
   * TagOnPreset findFirst
   */
  export type TagOnPresetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagOnPreset
     */
    select?: TagOnPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TagOnPreset
     */
    omit?: TagOnPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagOnPresetInclude<ExtArgs> | null
    /**
     * Filter, which TagOnPreset to fetch.
     */
    where?: TagOnPresetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TagOnPresets to fetch.
     */
    orderBy?: TagOnPresetOrderByWithRelationInput | TagOnPresetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TagOnPresets.
     */
    cursor?: TagOnPresetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TagOnPresets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TagOnPresets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TagOnPresets.
     */
    distinct?: TagOnPresetScalarFieldEnum | TagOnPresetScalarFieldEnum[]
  }

  /**
   * TagOnPreset findFirstOrThrow
   */
  export type TagOnPresetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagOnPreset
     */
    select?: TagOnPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TagOnPreset
     */
    omit?: TagOnPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagOnPresetInclude<ExtArgs> | null
    /**
     * Filter, which TagOnPreset to fetch.
     */
    where?: TagOnPresetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TagOnPresets to fetch.
     */
    orderBy?: TagOnPresetOrderByWithRelationInput | TagOnPresetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TagOnPresets.
     */
    cursor?: TagOnPresetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TagOnPresets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TagOnPresets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TagOnPresets.
     */
    distinct?: TagOnPresetScalarFieldEnum | TagOnPresetScalarFieldEnum[]
  }

  /**
   * TagOnPreset findMany
   */
  export type TagOnPresetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagOnPreset
     */
    select?: TagOnPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TagOnPreset
     */
    omit?: TagOnPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagOnPresetInclude<ExtArgs> | null
    /**
     * Filter, which TagOnPresets to fetch.
     */
    where?: TagOnPresetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TagOnPresets to fetch.
     */
    orderBy?: TagOnPresetOrderByWithRelationInput | TagOnPresetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TagOnPresets.
     */
    cursor?: TagOnPresetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TagOnPresets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TagOnPresets.
     */
    skip?: number
    distinct?: TagOnPresetScalarFieldEnum | TagOnPresetScalarFieldEnum[]
  }

  /**
   * TagOnPreset create
   */
  export type TagOnPresetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagOnPreset
     */
    select?: TagOnPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TagOnPreset
     */
    omit?: TagOnPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagOnPresetInclude<ExtArgs> | null
    /**
     * The data needed to create a TagOnPreset.
     */
    data: XOR<TagOnPresetCreateInput, TagOnPresetUncheckedCreateInput>
  }

  /**
   * TagOnPreset createMany
   */
  export type TagOnPresetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TagOnPresets.
     */
    data: TagOnPresetCreateManyInput | TagOnPresetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TagOnPreset update
   */
  export type TagOnPresetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagOnPreset
     */
    select?: TagOnPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TagOnPreset
     */
    omit?: TagOnPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagOnPresetInclude<ExtArgs> | null
    /**
     * The data needed to update a TagOnPreset.
     */
    data: XOR<TagOnPresetUpdateInput, TagOnPresetUncheckedUpdateInput>
    /**
     * Choose, which TagOnPreset to update.
     */
    where: TagOnPresetWhereUniqueInput
  }

  /**
   * TagOnPreset updateMany
   */
  export type TagOnPresetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TagOnPresets.
     */
    data: XOR<TagOnPresetUpdateManyMutationInput, TagOnPresetUncheckedUpdateManyInput>
    /**
     * Filter which TagOnPresets to update
     */
    where?: TagOnPresetWhereInput
    /**
     * Limit how many TagOnPresets to update.
     */
    limit?: number
  }

  /**
   * TagOnPreset upsert
   */
  export type TagOnPresetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagOnPreset
     */
    select?: TagOnPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TagOnPreset
     */
    omit?: TagOnPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagOnPresetInclude<ExtArgs> | null
    /**
     * The filter to search for the TagOnPreset to update in case it exists.
     */
    where: TagOnPresetWhereUniqueInput
    /**
     * In case the TagOnPreset found by the `where` argument doesn't exist, create a new TagOnPreset with this data.
     */
    create: XOR<TagOnPresetCreateInput, TagOnPresetUncheckedCreateInput>
    /**
     * In case the TagOnPreset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagOnPresetUpdateInput, TagOnPresetUncheckedUpdateInput>
  }

  /**
   * TagOnPreset delete
   */
  export type TagOnPresetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagOnPreset
     */
    select?: TagOnPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TagOnPreset
     */
    omit?: TagOnPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagOnPresetInclude<ExtArgs> | null
    /**
     * Filter which TagOnPreset to delete.
     */
    where: TagOnPresetWhereUniqueInput
  }

  /**
   * TagOnPreset deleteMany
   */
  export type TagOnPresetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TagOnPresets to delete
     */
    where?: TagOnPresetWhereInput
    /**
     * Limit how many TagOnPresets to delete.
     */
    limit?: number
  }

  /**
   * TagOnPreset without action
   */
  export type TagOnPresetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagOnPreset
     */
    select?: TagOnPresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TagOnPreset
     */
    omit?: TagOnPresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagOnPresetInclude<ExtArgs> | null
  }


  /**
   * Model DownloadHistory
   */

  export type AggregateDownloadHistory = {
    _count: DownloadHistoryCountAggregateOutputType | null
    _avg: DownloadHistoryAvgAggregateOutputType | null
    _sum: DownloadHistorySumAggregateOutputType | null
    _min: DownloadHistoryMinAggregateOutputType | null
    _max: DownloadHistoryMaxAggregateOutputType | null
  }

  export type DownloadHistoryAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    presetId: number | null
  }

  export type DownloadHistorySumAggregateOutputType = {
    id: number | null
    userId: number | null
    presetId: number | null
  }

  export type DownloadHistoryMinAggregateOutputType = {
    id: number | null
    userId: number | null
    presetId: number | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type DownloadHistoryMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    presetId: number | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type DownloadHistoryCountAggregateOutputType = {
    id: number
    userId: number
    presetId: number
    ipAddress: number
    createdAt: number
    _all: number
  }


  export type DownloadHistoryAvgAggregateInputType = {
    id?: true
    userId?: true
    presetId?: true
  }

  export type DownloadHistorySumAggregateInputType = {
    id?: true
    userId?: true
    presetId?: true
  }

  export type DownloadHistoryMinAggregateInputType = {
    id?: true
    userId?: true
    presetId?: true
    ipAddress?: true
    createdAt?: true
  }

  export type DownloadHistoryMaxAggregateInputType = {
    id?: true
    userId?: true
    presetId?: true
    ipAddress?: true
    createdAt?: true
  }

  export type DownloadHistoryCountAggregateInputType = {
    id?: true
    userId?: true
    presetId?: true
    ipAddress?: true
    createdAt?: true
    _all?: true
  }

  export type DownloadHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DownloadHistory to aggregate.
     */
    where?: DownloadHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DownloadHistories to fetch.
     */
    orderBy?: DownloadHistoryOrderByWithRelationInput | DownloadHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DownloadHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DownloadHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DownloadHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DownloadHistories
    **/
    _count?: true | DownloadHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DownloadHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DownloadHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DownloadHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DownloadHistoryMaxAggregateInputType
  }

  export type GetDownloadHistoryAggregateType<T extends DownloadHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateDownloadHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDownloadHistory[P]>
      : GetScalarType<T[P], AggregateDownloadHistory[P]>
  }




  export type DownloadHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DownloadHistoryWhereInput
    orderBy?: DownloadHistoryOrderByWithAggregationInput | DownloadHistoryOrderByWithAggregationInput[]
    by: DownloadHistoryScalarFieldEnum[] | DownloadHistoryScalarFieldEnum
    having?: DownloadHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DownloadHistoryCountAggregateInputType | true
    _avg?: DownloadHistoryAvgAggregateInputType
    _sum?: DownloadHistorySumAggregateInputType
    _min?: DownloadHistoryMinAggregateInputType
    _max?: DownloadHistoryMaxAggregateInputType
  }

  export type DownloadHistoryGroupByOutputType = {
    id: number
    userId: number | null
    presetId: number
    ipAddress: string | null
    createdAt: Date
    _count: DownloadHistoryCountAggregateOutputType | null
    _avg: DownloadHistoryAvgAggregateOutputType | null
    _sum: DownloadHistorySumAggregateOutputType | null
    _min: DownloadHistoryMinAggregateOutputType | null
    _max: DownloadHistoryMaxAggregateOutputType | null
  }

  type GetDownloadHistoryGroupByPayload<T extends DownloadHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DownloadHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DownloadHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DownloadHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], DownloadHistoryGroupByOutputType[P]>
        }
      >
    >


  export type DownloadHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    presetId?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    user?: boolean | DownloadHistory$userArgs<ExtArgs>
    preset?: boolean | PresetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["downloadHistory"]>



  export type DownloadHistorySelectScalar = {
    id?: boolean
    userId?: boolean
    presetId?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }

  export type DownloadHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "presetId" | "ipAddress" | "createdAt", ExtArgs["result"]["downloadHistory"]>
  export type DownloadHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | DownloadHistory$userArgs<ExtArgs>
    preset?: boolean | PresetDefaultArgs<ExtArgs>
  }

  export type $DownloadHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DownloadHistory"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      preset: Prisma.$PresetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number | null
      presetId: number
      ipAddress: string | null
      createdAt: Date
    }, ExtArgs["result"]["downloadHistory"]>
    composites: {}
  }

  type DownloadHistoryGetPayload<S extends boolean | null | undefined | DownloadHistoryDefaultArgs> = $Result.GetResult<Prisma.$DownloadHistoryPayload, S>

  type DownloadHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DownloadHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DownloadHistoryCountAggregateInputType | true
    }

  export interface DownloadHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DownloadHistory'], meta: { name: 'DownloadHistory' } }
    /**
     * Find zero or one DownloadHistory that matches the filter.
     * @param {DownloadHistoryFindUniqueArgs} args - Arguments to find a DownloadHistory
     * @example
     * // Get one DownloadHistory
     * const downloadHistory = await prisma.downloadHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DownloadHistoryFindUniqueArgs>(args: SelectSubset<T, DownloadHistoryFindUniqueArgs<ExtArgs>>): Prisma__DownloadHistoryClient<$Result.GetResult<Prisma.$DownloadHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DownloadHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DownloadHistoryFindUniqueOrThrowArgs} args - Arguments to find a DownloadHistory
     * @example
     * // Get one DownloadHistory
     * const downloadHistory = await prisma.downloadHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DownloadHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, DownloadHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DownloadHistoryClient<$Result.GetResult<Prisma.$DownloadHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DownloadHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadHistoryFindFirstArgs} args - Arguments to find a DownloadHistory
     * @example
     * // Get one DownloadHistory
     * const downloadHistory = await prisma.downloadHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DownloadHistoryFindFirstArgs>(args?: SelectSubset<T, DownloadHistoryFindFirstArgs<ExtArgs>>): Prisma__DownloadHistoryClient<$Result.GetResult<Prisma.$DownloadHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DownloadHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadHistoryFindFirstOrThrowArgs} args - Arguments to find a DownloadHistory
     * @example
     * // Get one DownloadHistory
     * const downloadHistory = await prisma.downloadHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DownloadHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, DownloadHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__DownloadHistoryClient<$Result.GetResult<Prisma.$DownloadHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DownloadHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DownloadHistories
     * const downloadHistories = await prisma.downloadHistory.findMany()
     * 
     * // Get first 10 DownloadHistories
     * const downloadHistories = await prisma.downloadHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const downloadHistoryWithIdOnly = await prisma.downloadHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DownloadHistoryFindManyArgs>(args?: SelectSubset<T, DownloadHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DownloadHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DownloadHistory.
     * @param {DownloadHistoryCreateArgs} args - Arguments to create a DownloadHistory.
     * @example
     * // Create one DownloadHistory
     * const DownloadHistory = await prisma.downloadHistory.create({
     *   data: {
     *     // ... data to create a DownloadHistory
     *   }
     * })
     * 
     */
    create<T extends DownloadHistoryCreateArgs>(args: SelectSubset<T, DownloadHistoryCreateArgs<ExtArgs>>): Prisma__DownloadHistoryClient<$Result.GetResult<Prisma.$DownloadHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DownloadHistories.
     * @param {DownloadHistoryCreateManyArgs} args - Arguments to create many DownloadHistories.
     * @example
     * // Create many DownloadHistories
     * const downloadHistory = await prisma.downloadHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DownloadHistoryCreateManyArgs>(args?: SelectSubset<T, DownloadHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a DownloadHistory.
     * @param {DownloadHistoryDeleteArgs} args - Arguments to delete one DownloadHistory.
     * @example
     * // Delete one DownloadHistory
     * const DownloadHistory = await prisma.downloadHistory.delete({
     *   where: {
     *     // ... filter to delete one DownloadHistory
     *   }
     * })
     * 
     */
    delete<T extends DownloadHistoryDeleteArgs>(args: SelectSubset<T, DownloadHistoryDeleteArgs<ExtArgs>>): Prisma__DownloadHistoryClient<$Result.GetResult<Prisma.$DownloadHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DownloadHistory.
     * @param {DownloadHistoryUpdateArgs} args - Arguments to update one DownloadHistory.
     * @example
     * // Update one DownloadHistory
     * const downloadHistory = await prisma.downloadHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DownloadHistoryUpdateArgs>(args: SelectSubset<T, DownloadHistoryUpdateArgs<ExtArgs>>): Prisma__DownloadHistoryClient<$Result.GetResult<Prisma.$DownloadHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DownloadHistories.
     * @param {DownloadHistoryDeleteManyArgs} args - Arguments to filter DownloadHistories to delete.
     * @example
     * // Delete a few DownloadHistories
     * const { count } = await prisma.downloadHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DownloadHistoryDeleteManyArgs>(args?: SelectSubset<T, DownloadHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DownloadHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DownloadHistories
     * const downloadHistory = await prisma.downloadHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DownloadHistoryUpdateManyArgs>(args: SelectSubset<T, DownloadHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DownloadHistory.
     * @param {DownloadHistoryUpsertArgs} args - Arguments to update or create a DownloadHistory.
     * @example
     * // Update or create a DownloadHistory
     * const downloadHistory = await prisma.downloadHistory.upsert({
     *   create: {
     *     // ... data to create a DownloadHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DownloadHistory we want to update
     *   }
     * })
     */
    upsert<T extends DownloadHistoryUpsertArgs>(args: SelectSubset<T, DownloadHistoryUpsertArgs<ExtArgs>>): Prisma__DownloadHistoryClient<$Result.GetResult<Prisma.$DownloadHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DownloadHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadHistoryCountArgs} args - Arguments to filter DownloadHistories to count.
     * @example
     * // Count the number of DownloadHistories
     * const count = await prisma.downloadHistory.count({
     *   where: {
     *     // ... the filter for the DownloadHistories we want to count
     *   }
     * })
    **/
    count<T extends DownloadHistoryCountArgs>(
      args?: Subset<T, DownloadHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DownloadHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DownloadHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DownloadHistoryAggregateArgs>(args: Subset<T, DownloadHistoryAggregateArgs>): Prisma.PrismaPromise<GetDownloadHistoryAggregateType<T>>

    /**
     * Group by DownloadHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DownloadHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DownloadHistoryGroupByArgs['orderBy'] }
        : { orderBy?: DownloadHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DownloadHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDownloadHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DownloadHistory model
   */
  readonly fields: DownloadHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DownloadHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DownloadHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends DownloadHistory$userArgs<ExtArgs> = {}>(args?: Subset<T, DownloadHistory$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    preset<T extends PresetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PresetDefaultArgs<ExtArgs>>): Prisma__PresetClient<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DownloadHistory model
   */
  interface DownloadHistoryFieldRefs {
    readonly id: FieldRef<"DownloadHistory", 'Int'>
    readonly userId: FieldRef<"DownloadHistory", 'Int'>
    readonly presetId: FieldRef<"DownloadHistory", 'Int'>
    readonly ipAddress: FieldRef<"DownloadHistory", 'String'>
    readonly createdAt: FieldRef<"DownloadHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DownloadHistory findUnique
   */
  export type DownloadHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadHistory
     */
    select?: DownloadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadHistory
     */
    omit?: DownloadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadHistoryInclude<ExtArgs> | null
    /**
     * Filter, which DownloadHistory to fetch.
     */
    where: DownloadHistoryWhereUniqueInput
  }

  /**
   * DownloadHistory findUniqueOrThrow
   */
  export type DownloadHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadHistory
     */
    select?: DownloadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadHistory
     */
    omit?: DownloadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadHistoryInclude<ExtArgs> | null
    /**
     * Filter, which DownloadHistory to fetch.
     */
    where: DownloadHistoryWhereUniqueInput
  }

  /**
   * DownloadHistory findFirst
   */
  export type DownloadHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadHistory
     */
    select?: DownloadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadHistory
     */
    omit?: DownloadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadHistoryInclude<ExtArgs> | null
    /**
     * Filter, which DownloadHistory to fetch.
     */
    where?: DownloadHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DownloadHistories to fetch.
     */
    orderBy?: DownloadHistoryOrderByWithRelationInput | DownloadHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DownloadHistories.
     */
    cursor?: DownloadHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DownloadHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DownloadHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DownloadHistories.
     */
    distinct?: DownloadHistoryScalarFieldEnum | DownloadHistoryScalarFieldEnum[]
  }

  /**
   * DownloadHistory findFirstOrThrow
   */
  export type DownloadHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadHistory
     */
    select?: DownloadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadHistory
     */
    omit?: DownloadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadHistoryInclude<ExtArgs> | null
    /**
     * Filter, which DownloadHistory to fetch.
     */
    where?: DownloadHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DownloadHistories to fetch.
     */
    orderBy?: DownloadHistoryOrderByWithRelationInput | DownloadHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DownloadHistories.
     */
    cursor?: DownloadHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DownloadHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DownloadHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DownloadHistories.
     */
    distinct?: DownloadHistoryScalarFieldEnum | DownloadHistoryScalarFieldEnum[]
  }

  /**
   * DownloadHistory findMany
   */
  export type DownloadHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadHistory
     */
    select?: DownloadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadHistory
     */
    omit?: DownloadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadHistoryInclude<ExtArgs> | null
    /**
     * Filter, which DownloadHistories to fetch.
     */
    where?: DownloadHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DownloadHistories to fetch.
     */
    orderBy?: DownloadHistoryOrderByWithRelationInput | DownloadHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DownloadHistories.
     */
    cursor?: DownloadHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DownloadHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DownloadHistories.
     */
    skip?: number
    distinct?: DownloadHistoryScalarFieldEnum | DownloadHistoryScalarFieldEnum[]
  }

  /**
   * DownloadHistory create
   */
  export type DownloadHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadHistory
     */
    select?: DownloadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadHistory
     */
    omit?: DownloadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a DownloadHistory.
     */
    data: XOR<DownloadHistoryCreateInput, DownloadHistoryUncheckedCreateInput>
  }

  /**
   * DownloadHistory createMany
   */
  export type DownloadHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DownloadHistories.
     */
    data: DownloadHistoryCreateManyInput | DownloadHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DownloadHistory update
   */
  export type DownloadHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadHistory
     */
    select?: DownloadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadHistory
     */
    omit?: DownloadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a DownloadHistory.
     */
    data: XOR<DownloadHistoryUpdateInput, DownloadHistoryUncheckedUpdateInput>
    /**
     * Choose, which DownloadHistory to update.
     */
    where: DownloadHistoryWhereUniqueInput
  }

  /**
   * DownloadHistory updateMany
   */
  export type DownloadHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DownloadHistories.
     */
    data: XOR<DownloadHistoryUpdateManyMutationInput, DownloadHistoryUncheckedUpdateManyInput>
    /**
     * Filter which DownloadHistories to update
     */
    where?: DownloadHistoryWhereInput
    /**
     * Limit how many DownloadHistories to update.
     */
    limit?: number
  }

  /**
   * DownloadHistory upsert
   */
  export type DownloadHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadHistory
     */
    select?: DownloadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadHistory
     */
    omit?: DownloadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the DownloadHistory to update in case it exists.
     */
    where: DownloadHistoryWhereUniqueInput
    /**
     * In case the DownloadHistory found by the `where` argument doesn't exist, create a new DownloadHistory with this data.
     */
    create: XOR<DownloadHistoryCreateInput, DownloadHistoryUncheckedCreateInput>
    /**
     * In case the DownloadHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DownloadHistoryUpdateInput, DownloadHistoryUncheckedUpdateInput>
  }

  /**
   * DownloadHistory delete
   */
  export type DownloadHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadHistory
     */
    select?: DownloadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadHistory
     */
    omit?: DownloadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadHistoryInclude<ExtArgs> | null
    /**
     * Filter which DownloadHistory to delete.
     */
    where: DownloadHistoryWhereUniqueInput
  }

  /**
   * DownloadHistory deleteMany
   */
  export type DownloadHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DownloadHistories to delete
     */
    where?: DownloadHistoryWhereInput
    /**
     * Limit how many DownloadHistories to delete.
     */
    limit?: number
  }

  /**
   * DownloadHistory.user
   */
  export type DownloadHistory$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * DownloadHistory without action
   */
  export type DownloadHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadHistory
     */
    select?: DownloadHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadHistory
     */
    omit?: DownloadHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadHistoryInclude<ExtArgs> | null
  }


  /**
   * Model Like
   */

  export type AggregateLike = {
    _count: LikeCountAggregateOutputType | null
    _avg: LikeAvgAggregateOutputType | null
    _sum: LikeSumAggregateOutputType | null
    _min: LikeMinAggregateOutputType | null
    _max: LikeMaxAggregateOutputType | null
  }

  export type LikeAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    presetId: number | null
  }

  export type LikeSumAggregateOutputType = {
    id: number | null
    userId: number | null
    presetId: number | null
  }

  export type LikeMinAggregateOutputType = {
    id: number | null
    userId: number | null
    presetId: number | null
    createdAt: Date | null
  }

  export type LikeMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    presetId: number | null
    createdAt: Date | null
  }

  export type LikeCountAggregateOutputType = {
    id: number
    userId: number
    presetId: number
    createdAt: number
    _all: number
  }


  export type LikeAvgAggregateInputType = {
    id?: true
    userId?: true
    presetId?: true
  }

  export type LikeSumAggregateInputType = {
    id?: true
    userId?: true
    presetId?: true
  }

  export type LikeMinAggregateInputType = {
    id?: true
    userId?: true
    presetId?: true
    createdAt?: true
  }

  export type LikeMaxAggregateInputType = {
    id?: true
    userId?: true
    presetId?: true
    createdAt?: true
  }

  export type LikeCountAggregateInputType = {
    id?: true
    userId?: true
    presetId?: true
    createdAt?: true
    _all?: true
  }

  export type LikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Like to aggregate.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Likes
    **/
    _count?: true | LikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LikeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LikeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LikeMaxAggregateInputType
  }

  export type GetLikeAggregateType<T extends LikeAggregateArgs> = {
        [P in keyof T & keyof AggregateLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLike[P]>
      : GetScalarType<T[P], AggregateLike[P]>
  }




  export type LikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LikeWhereInput
    orderBy?: LikeOrderByWithAggregationInput | LikeOrderByWithAggregationInput[]
    by: LikeScalarFieldEnum[] | LikeScalarFieldEnum
    having?: LikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LikeCountAggregateInputType | true
    _avg?: LikeAvgAggregateInputType
    _sum?: LikeSumAggregateInputType
    _min?: LikeMinAggregateInputType
    _max?: LikeMaxAggregateInputType
  }

  export type LikeGroupByOutputType = {
    id: number
    userId: number
    presetId: number
    createdAt: Date
    _count: LikeCountAggregateOutputType | null
    _avg: LikeAvgAggregateOutputType | null
    _sum: LikeSumAggregateOutputType | null
    _min: LikeMinAggregateOutputType | null
    _max: LikeMaxAggregateOutputType | null
  }

  type GetLikeGroupByPayload<T extends LikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LikeGroupByOutputType[P]>
            : GetScalarType<T[P], LikeGroupByOutputType[P]>
        }
      >
    >


  export type LikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    presetId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    preset?: boolean | PresetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["like"]>



  export type LikeSelectScalar = {
    id?: boolean
    userId?: boolean
    presetId?: boolean
    createdAt?: boolean
  }

  export type LikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "presetId" | "createdAt", ExtArgs["result"]["like"]>
  export type LikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    preset?: boolean | PresetDefaultArgs<ExtArgs>
  }

  export type $LikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Like"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      preset: Prisma.$PresetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      presetId: number
      createdAt: Date
    }, ExtArgs["result"]["like"]>
    composites: {}
  }

  type LikeGetPayload<S extends boolean | null | undefined | LikeDefaultArgs> = $Result.GetResult<Prisma.$LikePayload, S>

  type LikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LikeCountAggregateInputType | true
    }

  export interface LikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Like'], meta: { name: 'Like' } }
    /**
     * Find zero or one Like that matches the filter.
     * @param {LikeFindUniqueArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LikeFindUniqueArgs>(args: SelectSubset<T, LikeFindUniqueArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Like that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LikeFindUniqueOrThrowArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LikeFindUniqueOrThrowArgs>(args: SelectSubset<T, LikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Like that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeFindFirstArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LikeFindFirstArgs>(args?: SelectSubset<T, LikeFindFirstArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Like that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeFindFirstOrThrowArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LikeFindFirstOrThrowArgs>(args?: SelectSubset<T, LikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Likes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Likes
     * const likes = await prisma.like.findMany()
     * 
     * // Get first 10 Likes
     * const likes = await prisma.like.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const likeWithIdOnly = await prisma.like.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LikeFindManyArgs>(args?: SelectSubset<T, LikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Like.
     * @param {LikeCreateArgs} args - Arguments to create a Like.
     * @example
     * // Create one Like
     * const Like = await prisma.like.create({
     *   data: {
     *     // ... data to create a Like
     *   }
     * })
     * 
     */
    create<T extends LikeCreateArgs>(args: SelectSubset<T, LikeCreateArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Likes.
     * @param {LikeCreateManyArgs} args - Arguments to create many Likes.
     * @example
     * // Create many Likes
     * const like = await prisma.like.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LikeCreateManyArgs>(args?: SelectSubset<T, LikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Like.
     * @param {LikeDeleteArgs} args - Arguments to delete one Like.
     * @example
     * // Delete one Like
     * const Like = await prisma.like.delete({
     *   where: {
     *     // ... filter to delete one Like
     *   }
     * })
     * 
     */
    delete<T extends LikeDeleteArgs>(args: SelectSubset<T, LikeDeleteArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Like.
     * @param {LikeUpdateArgs} args - Arguments to update one Like.
     * @example
     * // Update one Like
     * const like = await prisma.like.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LikeUpdateArgs>(args: SelectSubset<T, LikeUpdateArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Likes.
     * @param {LikeDeleteManyArgs} args - Arguments to filter Likes to delete.
     * @example
     * // Delete a few Likes
     * const { count } = await prisma.like.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LikeDeleteManyArgs>(args?: SelectSubset<T, LikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Likes
     * const like = await prisma.like.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LikeUpdateManyArgs>(args: SelectSubset<T, LikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Like.
     * @param {LikeUpsertArgs} args - Arguments to update or create a Like.
     * @example
     * // Update or create a Like
     * const like = await prisma.like.upsert({
     *   create: {
     *     // ... data to create a Like
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Like we want to update
     *   }
     * })
     */
    upsert<T extends LikeUpsertArgs>(args: SelectSubset<T, LikeUpsertArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeCountArgs} args - Arguments to filter Likes to count.
     * @example
     * // Count the number of Likes
     * const count = await prisma.like.count({
     *   where: {
     *     // ... the filter for the Likes we want to count
     *   }
     * })
    **/
    count<T extends LikeCountArgs>(
      args?: Subset<T, LikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Like.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LikeAggregateArgs>(args: Subset<T, LikeAggregateArgs>): Prisma.PrismaPromise<GetLikeAggregateType<T>>

    /**
     * Group by Like.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LikeGroupByArgs['orderBy'] }
        : { orderBy?: LikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Like model
   */
  readonly fields: LikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Like.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    preset<T extends PresetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PresetDefaultArgs<ExtArgs>>): Prisma__PresetClient<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Like model
   */
  interface LikeFieldRefs {
    readonly id: FieldRef<"Like", 'Int'>
    readonly userId: FieldRef<"Like", 'Int'>
    readonly presetId: FieldRef<"Like", 'Int'>
    readonly createdAt: FieldRef<"Like", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Like findUnique
   */
  export type LikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like findUniqueOrThrow
   */
  export type LikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like findFirst
   */
  export type LikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Likes.
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Likes.
     */
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Like findFirstOrThrow
   */
  export type LikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Likes.
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Likes.
     */
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Like findMany
   */
  export type LikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Likes to fetch.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Likes.
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Like create
   */
  export type LikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * The data needed to create a Like.
     */
    data: XOR<LikeCreateInput, LikeUncheckedCreateInput>
  }

  /**
   * Like createMany
   */
  export type LikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Likes.
     */
    data: LikeCreateManyInput | LikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Like update
   */
  export type LikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * The data needed to update a Like.
     */
    data: XOR<LikeUpdateInput, LikeUncheckedUpdateInput>
    /**
     * Choose, which Like to update.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like updateMany
   */
  export type LikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Likes.
     */
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyInput>
    /**
     * Filter which Likes to update
     */
    where?: LikeWhereInput
    /**
     * Limit how many Likes to update.
     */
    limit?: number
  }

  /**
   * Like upsert
   */
  export type LikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * The filter to search for the Like to update in case it exists.
     */
    where: LikeWhereUniqueInput
    /**
     * In case the Like found by the `where` argument doesn't exist, create a new Like with this data.
     */
    create: XOR<LikeCreateInput, LikeUncheckedCreateInput>
    /**
     * In case the Like was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LikeUpdateInput, LikeUncheckedUpdateInput>
  }

  /**
   * Like delete
   */
  export type LikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter which Like to delete.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like deleteMany
   */
  export type LikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Likes to delete
     */
    where?: LikeWhereInput
    /**
     * Limit how many Likes to delete.
     */
    limit?: number
  }

  /**
   * Like without action
   */
  export type LikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
  }


  /**
   * Model Favorite
   */

  export type AggregateFavorite = {
    _count: FavoriteCountAggregateOutputType | null
    _avg: FavoriteAvgAggregateOutputType | null
    _sum: FavoriteSumAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  export type FavoriteAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    presetId: number | null
  }

  export type FavoriteSumAggregateOutputType = {
    id: number | null
    userId: number | null
    presetId: number | null
  }

  export type FavoriteMinAggregateOutputType = {
    id: number | null
    userId: number | null
    presetId: number | null
    createdAt: Date | null
  }

  export type FavoriteMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    presetId: number | null
    createdAt: Date | null
  }

  export type FavoriteCountAggregateOutputType = {
    id: number
    userId: number
    presetId: number
    createdAt: number
    _all: number
  }


  export type FavoriteAvgAggregateInputType = {
    id?: true
    userId?: true
    presetId?: true
  }

  export type FavoriteSumAggregateInputType = {
    id?: true
    userId?: true
    presetId?: true
  }

  export type FavoriteMinAggregateInputType = {
    id?: true
    userId?: true
    presetId?: true
    createdAt?: true
  }

  export type FavoriteMaxAggregateInputType = {
    id?: true
    userId?: true
    presetId?: true
    createdAt?: true
  }

  export type FavoriteCountAggregateInputType = {
    id?: true
    userId?: true
    presetId?: true
    createdAt?: true
    _all?: true
  }

  export type FavoriteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorite to aggregate.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Favorites
    **/
    _count?: true | FavoriteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FavoriteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FavoriteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavoriteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavoriteMaxAggregateInputType
  }

  export type GetFavoriteAggregateType<T extends FavoriteAggregateArgs> = {
        [P in keyof T & keyof AggregateFavorite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavorite[P]>
      : GetScalarType<T[P], AggregateFavorite[P]>
  }




  export type FavoriteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithAggregationInput | FavoriteOrderByWithAggregationInput[]
    by: FavoriteScalarFieldEnum[] | FavoriteScalarFieldEnum
    having?: FavoriteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavoriteCountAggregateInputType | true
    _avg?: FavoriteAvgAggregateInputType
    _sum?: FavoriteSumAggregateInputType
    _min?: FavoriteMinAggregateInputType
    _max?: FavoriteMaxAggregateInputType
  }

  export type FavoriteGroupByOutputType = {
    id: number
    userId: number
    presetId: number
    createdAt: Date
    _count: FavoriteCountAggregateOutputType | null
    _avg: FavoriteAvgAggregateOutputType | null
    _sum: FavoriteSumAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  type GetFavoriteGroupByPayload<T extends FavoriteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FavoriteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavoriteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
            : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
        }
      >
    >


  export type FavoriteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    presetId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    preset?: boolean | PresetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>



  export type FavoriteSelectScalar = {
    id?: boolean
    userId?: boolean
    presetId?: boolean
    createdAt?: boolean
  }

  export type FavoriteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "presetId" | "createdAt", ExtArgs["result"]["favorite"]>
  export type FavoriteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    preset?: boolean | PresetDefaultArgs<ExtArgs>
  }

  export type $FavoritePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Favorite"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      preset: Prisma.$PresetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      presetId: number
      createdAt: Date
    }, ExtArgs["result"]["favorite"]>
    composites: {}
  }

  type FavoriteGetPayload<S extends boolean | null | undefined | FavoriteDefaultArgs> = $Result.GetResult<Prisma.$FavoritePayload, S>

  type FavoriteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FavoriteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FavoriteCountAggregateInputType | true
    }

  export interface FavoriteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Favorite'], meta: { name: 'Favorite' } }
    /**
     * Find zero or one Favorite that matches the filter.
     * @param {FavoriteFindUniqueArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FavoriteFindUniqueArgs>(args: SelectSubset<T, FavoriteFindUniqueArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Favorite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FavoriteFindUniqueOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FavoriteFindUniqueOrThrowArgs>(args: SelectSubset<T, FavoriteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FavoriteFindFirstArgs>(args?: SelectSubset<T, FavoriteFindFirstArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Favorite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FavoriteFindFirstOrThrowArgs>(args?: SelectSubset<T, FavoriteFindFirstOrThrowArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Favorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Favorites
     * const favorites = await prisma.favorite.findMany()
     * 
     * // Get first 10 Favorites
     * const favorites = await prisma.favorite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const favoriteWithIdOnly = await prisma.favorite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FavoriteFindManyArgs>(args?: SelectSubset<T, FavoriteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Favorite.
     * @param {FavoriteCreateArgs} args - Arguments to create a Favorite.
     * @example
     * // Create one Favorite
     * const Favorite = await prisma.favorite.create({
     *   data: {
     *     // ... data to create a Favorite
     *   }
     * })
     * 
     */
    create<T extends FavoriteCreateArgs>(args: SelectSubset<T, FavoriteCreateArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Favorites.
     * @param {FavoriteCreateManyArgs} args - Arguments to create many Favorites.
     * @example
     * // Create many Favorites
     * const favorite = await prisma.favorite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FavoriteCreateManyArgs>(args?: SelectSubset<T, FavoriteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Favorite.
     * @param {FavoriteDeleteArgs} args - Arguments to delete one Favorite.
     * @example
     * // Delete one Favorite
     * const Favorite = await prisma.favorite.delete({
     *   where: {
     *     // ... filter to delete one Favorite
     *   }
     * })
     * 
     */
    delete<T extends FavoriteDeleteArgs>(args: SelectSubset<T, FavoriteDeleteArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Favorite.
     * @param {FavoriteUpdateArgs} args - Arguments to update one Favorite.
     * @example
     * // Update one Favorite
     * const favorite = await prisma.favorite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FavoriteUpdateArgs>(args: SelectSubset<T, FavoriteUpdateArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Favorites.
     * @param {FavoriteDeleteManyArgs} args - Arguments to filter Favorites to delete.
     * @example
     * // Delete a few Favorites
     * const { count } = await prisma.favorite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FavoriteDeleteManyArgs>(args?: SelectSubset<T, FavoriteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Favorites
     * const favorite = await prisma.favorite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FavoriteUpdateManyArgs>(args: SelectSubset<T, FavoriteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Favorite.
     * @param {FavoriteUpsertArgs} args - Arguments to update or create a Favorite.
     * @example
     * // Update or create a Favorite
     * const favorite = await prisma.favorite.upsert({
     *   create: {
     *     // ... data to create a Favorite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Favorite we want to update
     *   }
     * })
     */
    upsert<T extends FavoriteUpsertArgs>(args: SelectSubset<T, FavoriteUpsertArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteCountArgs} args - Arguments to filter Favorites to count.
     * @example
     * // Count the number of Favorites
     * const count = await prisma.favorite.count({
     *   where: {
     *     // ... the filter for the Favorites we want to count
     *   }
     * })
    **/
    count<T extends FavoriteCountArgs>(
      args?: Subset<T, FavoriteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavoriteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FavoriteAggregateArgs>(args: Subset<T, FavoriteAggregateArgs>): Prisma.PrismaPromise<GetFavoriteAggregateType<T>>

    /**
     * Group by Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FavoriteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FavoriteGroupByArgs['orderBy'] }
        : { orderBy?: FavoriteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FavoriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavoriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Favorite model
   */
  readonly fields: FavoriteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Favorite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FavoriteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    preset<T extends PresetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PresetDefaultArgs<ExtArgs>>): Prisma__PresetClient<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Favorite model
   */
  interface FavoriteFieldRefs {
    readonly id: FieldRef<"Favorite", 'Int'>
    readonly userId: FieldRef<"Favorite", 'Int'>
    readonly presetId: FieldRef<"Favorite", 'Int'>
    readonly createdAt: FieldRef<"Favorite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Favorite findUnique
   */
  export type FavoriteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite findUniqueOrThrow
   */
  export type FavoriteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite findFirst
   */
  export type FavoriteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite findFirstOrThrow
   */
  export type FavoriteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite findMany
   */
  export type FavoriteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorites to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite create
   */
  export type FavoriteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to create a Favorite.
     */
    data: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
  }

  /**
   * Favorite createMany
   */
  export type FavoriteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Favorites.
     */
    data: FavoriteCreateManyInput | FavoriteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Favorite update
   */
  export type FavoriteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to update a Favorite.
     */
    data: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
    /**
     * Choose, which Favorite to update.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite updateMany
   */
  export type FavoriteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Favorites.
     */
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyInput>
    /**
     * Filter which Favorites to update
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to update.
     */
    limit?: number
  }

  /**
   * Favorite upsert
   */
  export type FavoriteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The filter to search for the Favorite to update in case it exists.
     */
    where: FavoriteWhereUniqueInput
    /**
     * In case the Favorite found by the `where` argument doesn't exist, create a new Favorite with this data.
     */
    create: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
    /**
     * In case the Favorite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
  }

  /**
   * Favorite delete
   */
  export type FavoriteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter which Favorite to delete.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite deleteMany
   */
  export type FavoriteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorites to delete
     */
    where?: FavoriteWhereInput
    /**
     * Limit how many Favorites to delete.
     */
    limit?: number
  }

  /**
   * Favorite without action
   */
  export type FavoriteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Favorite
     */
    omit?: FavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentAvgAggregateOutputType = {
    id: number | null
    presetId: number | null
    userId: number | null
    parentId: number | null
  }

  export type CommentSumAggregateOutputType = {
    id: number | null
    presetId: number | null
    userId: number | null
    parentId: number | null
  }

  export type CommentMinAggregateOutputType = {
    id: number | null
    content: string | null
    presetId: number | null
    userId: number | null
    parentId: number | null
    createdAt: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    id: number | null
    content: string | null
    presetId: number | null
    userId: number | null
    parentId: number | null
    createdAt: Date | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    content: number
    presetId: number
    userId: number
    parentId: number
    createdAt: number
    _all: number
  }


  export type CommentAvgAggregateInputType = {
    id?: true
    presetId?: true
    userId?: true
    parentId?: true
  }

  export type CommentSumAggregateInputType = {
    id?: true
    presetId?: true
    userId?: true
    parentId?: true
  }

  export type CommentMinAggregateInputType = {
    id?: true
    content?: true
    presetId?: true
    userId?: true
    parentId?: true
    createdAt?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    content?: true
    presetId?: true
    userId?: true
    parentId?: true
    createdAt?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    content?: true
    presetId?: true
    userId?: true
    parentId?: true
    createdAt?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _avg?: CommentAvgAggregateInputType
    _sum?: CommentSumAggregateInputType
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: number
    content: string
    presetId: number
    userId: number
    parentId: number | null
    createdAt: Date
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    presetId?: boolean
    userId?: boolean
    parentId?: boolean
    createdAt?: boolean
    preset?: boolean | PresetDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>



  export type CommentSelectScalar = {
    id?: boolean
    content?: boolean
    presetId?: boolean
    userId?: boolean
    parentId?: boolean
    createdAt?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "presetId" | "userId" | "parentId" | "createdAt", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preset?: boolean | PresetDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      preset: Prisma.$PresetPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      content: string
      presetId: number
      userId: number
      parentId: number | null
      createdAt: Date
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    preset<T extends PresetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PresetDefaultArgs<ExtArgs>>): Prisma__PresetClient<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'Int'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly presetId: FieldRef<"Comment", 'Int'>
    readonly userId: FieldRef<"Comment", 'Int'>
    readonly parentId: FieldRef<"Comment", 'Int'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model Donation
   */

  export type AggregateDonation = {
    _count: DonationCountAggregateOutputType | null
    _avg: DonationAvgAggregateOutputType | null
    _sum: DonationSumAggregateOutputType | null
    _min: DonationMinAggregateOutputType | null
    _max: DonationMaxAggregateOutputType | null
  }

  export type DonationAvgAggregateOutputType = {
    id: number | null
    amount: number | null
    donorId: number | null
    creatorId: number | null
    presetId: number | null
  }

  export type DonationSumAggregateOutputType = {
    id: number | null
    amount: number | null
    donorId: number | null
    creatorId: number | null
    presetId: number | null
  }

  export type DonationMinAggregateOutputType = {
    id: number | null
    amount: number | null
    currency: string | null
    donorId: number | null
    creatorId: number | null
    presetId: number | null
    message: string | null
    createdAt: Date | null
  }

  export type DonationMaxAggregateOutputType = {
    id: number | null
    amount: number | null
    currency: string | null
    donorId: number | null
    creatorId: number | null
    presetId: number | null
    message: string | null
    createdAt: Date | null
  }

  export type DonationCountAggregateOutputType = {
    id: number
    amount: number
    currency: number
    donorId: number
    creatorId: number
    presetId: number
    message: number
    createdAt: number
    _all: number
  }


  export type DonationAvgAggregateInputType = {
    id?: true
    amount?: true
    donorId?: true
    creatorId?: true
    presetId?: true
  }

  export type DonationSumAggregateInputType = {
    id?: true
    amount?: true
    donorId?: true
    creatorId?: true
    presetId?: true
  }

  export type DonationMinAggregateInputType = {
    id?: true
    amount?: true
    currency?: true
    donorId?: true
    creatorId?: true
    presetId?: true
    message?: true
    createdAt?: true
  }

  export type DonationMaxAggregateInputType = {
    id?: true
    amount?: true
    currency?: true
    donorId?: true
    creatorId?: true
    presetId?: true
    message?: true
    createdAt?: true
  }

  export type DonationCountAggregateInputType = {
    id?: true
    amount?: true
    currency?: true
    donorId?: true
    creatorId?: true
    presetId?: true
    message?: true
    createdAt?: true
    _all?: true
  }

  export type DonationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Donation to aggregate.
     */
    where?: DonationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DonationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Donations
    **/
    _count?: true | DonationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DonationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DonationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DonationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DonationMaxAggregateInputType
  }

  export type GetDonationAggregateType<T extends DonationAggregateArgs> = {
        [P in keyof T & keyof AggregateDonation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDonation[P]>
      : GetScalarType<T[P], AggregateDonation[P]>
  }




  export type DonationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DonationWhereInput
    orderBy?: DonationOrderByWithAggregationInput | DonationOrderByWithAggregationInput[]
    by: DonationScalarFieldEnum[] | DonationScalarFieldEnum
    having?: DonationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DonationCountAggregateInputType | true
    _avg?: DonationAvgAggregateInputType
    _sum?: DonationSumAggregateInputType
    _min?: DonationMinAggregateInputType
    _max?: DonationMaxAggregateInputType
  }

  export type DonationGroupByOutputType = {
    id: number
    amount: number
    currency: string
    donorId: number
    creatorId: number
    presetId: number | null
    message: string | null
    createdAt: Date
    _count: DonationCountAggregateOutputType | null
    _avg: DonationAvgAggregateOutputType | null
    _sum: DonationSumAggregateOutputType | null
    _min: DonationMinAggregateOutputType | null
    _max: DonationMaxAggregateOutputType | null
  }

  type GetDonationGroupByPayload<T extends DonationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DonationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DonationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DonationGroupByOutputType[P]>
            : GetScalarType<T[P], DonationGroupByOutputType[P]>
        }
      >
    >


  export type DonationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    currency?: boolean
    donorId?: boolean
    creatorId?: boolean
    presetId?: boolean
    message?: boolean
    createdAt?: boolean
    donor?: boolean | UserDefaultArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    preset?: boolean | Donation$presetArgs<ExtArgs>
  }, ExtArgs["result"]["donation"]>



  export type DonationSelectScalar = {
    id?: boolean
    amount?: boolean
    currency?: boolean
    donorId?: boolean
    creatorId?: boolean
    presetId?: boolean
    message?: boolean
    createdAt?: boolean
  }

  export type DonationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "currency" | "donorId" | "creatorId" | "presetId" | "message" | "createdAt", ExtArgs["result"]["donation"]>
  export type DonationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    donor?: boolean | UserDefaultArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    preset?: boolean | Donation$presetArgs<ExtArgs>
  }

  export type $DonationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Donation"
    objects: {
      donor: Prisma.$UserPayload<ExtArgs>
      creator: Prisma.$UserPayload<ExtArgs>
      preset: Prisma.$PresetPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      amount: number
      currency: string
      donorId: number
      creatorId: number
      presetId: number | null
      message: string | null
      createdAt: Date
    }, ExtArgs["result"]["donation"]>
    composites: {}
  }

  type DonationGetPayload<S extends boolean | null | undefined | DonationDefaultArgs> = $Result.GetResult<Prisma.$DonationPayload, S>

  type DonationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DonationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DonationCountAggregateInputType | true
    }

  export interface DonationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Donation'], meta: { name: 'Donation' } }
    /**
     * Find zero or one Donation that matches the filter.
     * @param {DonationFindUniqueArgs} args - Arguments to find a Donation
     * @example
     * // Get one Donation
     * const donation = await prisma.donation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DonationFindUniqueArgs>(args: SelectSubset<T, DonationFindUniqueArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Donation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DonationFindUniqueOrThrowArgs} args - Arguments to find a Donation
     * @example
     * // Get one Donation
     * const donation = await prisma.donation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DonationFindUniqueOrThrowArgs>(args: SelectSubset<T, DonationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Donation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationFindFirstArgs} args - Arguments to find a Donation
     * @example
     * // Get one Donation
     * const donation = await prisma.donation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DonationFindFirstArgs>(args?: SelectSubset<T, DonationFindFirstArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Donation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationFindFirstOrThrowArgs} args - Arguments to find a Donation
     * @example
     * // Get one Donation
     * const donation = await prisma.donation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DonationFindFirstOrThrowArgs>(args?: SelectSubset<T, DonationFindFirstOrThrowArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Donations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Donations
     * const donations = await prisma.donation.findMany()
     * 
     * // Get first 10 Donations
     * const donations = await prisma.donation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const donationWithIdOnly = await prisma.donation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DonationFindManyArgs>(args?: SelectSubset<T, DonationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Donation.
     * @param {DonationCreateArgs} args - Arguments to create a Donation.
     * @example
     * // Create one Donation
     * const Donation = await prisma.donation.create({
     *   data: {
     *     // ... data to create a Donation
     *   }
     * })
     * 
     */
    create<T extends DonationCreateArgs>(args: SelectSubset<T, DonationCreateArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Donations.
     * @param {DonationCreateManyArgs} args - Arguments to create many Donations.
     * @example
     * // Create many Donations
     * const donation = await prisma.donation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DonationCreateManyArgs>(args?: SelectSubset<T, DonationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Donation.
     * @param {DonationDeleteArgs} args - Arguments to delete one Donation.
     * @example
     * // Delete one Donation
     * const Donation = await prisma.donation.delete({
     *   where: {
     *     // ... filter to delete one Donation
     *   }
     * })
     * 
     */
    delete<T extends DonationDeleteArgs>(args: SelectSubset<T, DonationDeleteArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Donation.
     * @param {DonationUpdateArgs} args - Arguments to update one Donation.
     * @example
     * // Update one Donation
     * const donation = await prisma.donation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DonationUpdateArgs>(args: SelectSubset<T, DonationUpdateArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Donations.
     * @param {DonationDeleteManyArgs} args - Arguments to filter Donations to delete.
     * @example
     * // Delete a few Donations
     * const { count } = await prisma.donation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DonationDeleteManyArgs>(args?: SelectSubset<T, DonationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Donations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Donations
     * const donation = await prisma.donation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DonationUpdateManyArgs>(args: SelectSubset<T, DonationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Donation.
     * @param {DonationUpsertArgs} args - Arguments to update or create a Donation.
     * @example
     * // Update or create a Donation
     * const donation = await prisma.donation.upsert({
     *   create: {
     *     // ... data to create a Donation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Donation we want to update
     *   }
     * })
     */
    upsert<T extends DonationUpsertArgs>(args: SelectSubset<T, DonationUpsertArgs<ExtArgs>>): Prisma__DonationClient<$Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Donations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationCountArgs} args - Arguments to filter Donations to count.
     * @example
     * // Count the number of Donations
     * const count = await prisma.donation.count({
     *   where: {
     *     // ... the filter for the Donations we want to count
     *   }
     * })
    **/
    count<T extends DonationCountArgs>(
      args?: Subset<T, DonationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DonationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Donation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DonationAggregateArgs>(args: Subset<T, DonationAggregateArgs>): Prisma.PrismaPromise<GetDonationAggregateType<T>>

    /**
     * Group by Donation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DonationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DonationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DonationGroupByArgs['orderBy'] }
        : { orderBy?: DonationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DonationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDonationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Donation model
   */
  readonly fields: DonationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Donation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DonationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    donor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    preset<T extends Donation$presetArgs<ExtArgs> = {}>(args?: Subset<T, Donation$presetArgs<ExtArgs>>): Prisma__PresetClient<$Result.GetResult<Prisma.$PresetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Donation model
   */
  interface DonationFieldRefs {
    readonly id: FieldRef<"Donation", 'Int'>
    readonly amount: FieldRef<"Donation", 'Int'>
    readonly currency: FieldRef<"Donation", 'String'>
    readonly donorId: FieldRef<"Donation", 'Int'>
    readonly creatorId: FieldRef<"Donation", 'Int'>
    readonly presetId: FieldRef<"Donation", 'Int'>
    readonly message: FieldRef<"Donation", 'String'>
    readonly createdAt: FieldRef<"Donation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Donation findUnique
   */
  export type DonationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter, which Donation to fetch.
     */
    where: DonationWhereUniqueInput
  }

  /**
   * Donation findUniqueOrThrow
   */
  export type DonationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter, which Donation to fetch.
     */
    where: DonationWhereUniqueInput
  }

  /**
   * Donation findFirst
   */
  export type DonationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter, which Donation to fetch.
     */
    where?: DonationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Donations.
     */
    cursor?: DonationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Donations.
     */
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * Donation findFirstOrThrow
   */
  export type DonationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter, which Donation to fetch.
     */
    where?: DonationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Donations.
     */
    cursor?: DonationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Donations.
     */
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * Donation findMany
   */
  export type DonationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter, which Donations to fetch.
     */
    where?: DonationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Donations to fetch.
     */
    orderBy?: DonationOrderByWithRelationInput | DonationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Donations.
     */
    cursor?: DonationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Donations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Donations.
     */
    skip?: number
    distinct?: DonationScalarFieldEnum | DonationScalarFieldEnum[]
  }

  /**
   * Donation create
   */
  export type DonationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * The data needed to create a Donation.
     */
    data: XOR<DonationCreateInput, DonationUncheckedCreateInput>
  }

  /**
   * Donation createMany
   */
  export type DonationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Donations.
     */
    data: DonationCreateManyInput | DonationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Donation update
   */
  export type DonationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * The data needed to update a Donation.
     */
    data: XOR<DonationUpdateInput, DonationUncheckedUpdateInput>
    /**
     * Choose, which Donation to update.
     */
    where: DonationWhereUniqueInput
  }

  /**
   * Donation updateMany
   */
  export type DonationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Donations.
     */
    data: XOR<DonationUpdateManyMutationInput, DonationUncheckedUpdateManyInput>
    /**
     * Filter which Donations to update
     */
    where?: DonationWhereInput
    /**
     * Limit how many Donations to update.
     */
    limit?: number
  }

  /**
   * Donation upsert
   */
  export type DonationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * The filter to search for the Donation to update in case it exists.
     */
    where: DonationWhereUniqueInput
    /**
     * In case the Donation found by the `where` argument doesn't exist, create a new Donation with this data.
     */
    create: XOR<DonationCreateInput, DonationUncheckedCreateInput>
    /**
     * In case the Donation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DonationUpdateInput, DonationUncheckedUpdateInput>
  }

  /**
   * Donation delete
   */
  export type DonationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
    /**
     * Filter which Donation to delete.
     */
    where: DonationWhereUniqueInput
  }

  /**
   * Donation deleteMany
   */
  export type DonationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Donations to delete
     */
    where?: DonationWhereInput
    /**
     * Limit how many Donations to delete.
     */
    limit?: number
  }

  /**
   * Donation.preset
   */
  export type Donation$presetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preset
     */
    select?: PresetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preset
     */
    omit?: PresetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresetInclude<ExtArgs> | null
    where?: PresetWhereInput
  }

  /**
   * Donation without action
   */
  export type DonationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: DonationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Donation
     */
    omit?: DonationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DonationInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: number | null
    userId: number | null
    title: string | null
    content: string | null
    link: string | null
    read: boolean | null
    type: string | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    title: string | null
    content: string | null
    link: string | null
    read: boolean | null
    type: string | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    content: number
    link: number
    read: number
    type: number
    createdAt: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type NotificationSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    content?: true
    link?: true
    read?: true
    type?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    content?: true
    link?: true
    read?: true
    type?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    content?: true
    link?: true
    read?: true
    type?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: number
    userId: number
    title: string
    content: string
    link: string | null
    read: boolean
    type: string
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    link?: boolean
    read?: boolean
    type?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>



  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    content?: boolean
    link?: boolean
    read?: boolean
    type?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "content" | "link" | "read" | "type" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      title: string
      content: string
      link: string | null
      read: boolean
      type: string
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'Int'>
    readonly userId: FieldRef<"Notification", 'Int'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly content: FieldRef<"Notification", 'String'>
    readonly link: FieldRef<"Notification", 'String'>
    readonly read: FieldRef<"Notification", 'Boolean'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    avatar: 'avatar',
    bio: 'bio',
    role: 'role',
    mustChangePassword: 'mustChangePassword',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PresetScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    daw: 'daw',
    format: 'format',
    filePath: 'filePath',
    fileSize: 'fileSize',
    files: 'files',
    coverImage: 'coverImage',
    downloads: 'downloads',
    likesCount: 'likesCount',
    favoritesCount: 'favoritesCount',
    isPublic: 'isPublic',
    previewAudio: 'previewAudio',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type PresetScalarFieldEnum = (typeof PresetScalarFieldEnum)[keyof typeof PresetScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const TagOnPresetScalarFieldEnum: {
    presetId: 'presetId',
    tagId: 'tagId'
  };

  export type TagOnPresetScalarFieldEnum = (typeof TagOnPresetScalarFieldEnum)[keyof typeof TagOnPresetScalarFieldEnum]


  export const DownloadHistoryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    presetId: 'presetId',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
  };

  export type DownloadHistoryScalarFieldEnum = (typeof DownloadHistoryScalarFieldEnum)[keyof typeof DownloadHistoryScalarFieldEnum]


  export const LikeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    presetId: 'presetId',
    createdAt: 'createdAt'
  };

  export type LikeScalarFieldEnum = (typeof LikeScalarFieldEnum)[keyof typeof LikeScalarFieldEnum]


  export const FavoriteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    presetId: 'presetId',
    createdAt: 'createdAt'
  };

  export type FavoriteScalarFieldEnum = (typeof FavoriteScalarFieldEnum)[keyof typeof FavoriteScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    content: 'content',
    presetId: 'presetId',
    userId: 'userId',
    parentId: 'parentId',
    createdAt: 'createdAt'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const DonationScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    currency: 'currency',
    donorId: 'donorId',
    creatorId: 'creatorId',
    presetId: 'presetId',
    message: 'message',
    createdAt: 'createdAt'
  };

  export type DonationScalarFieldEnum = (typeof DonationScalarFieldEnum)[keyof typeof DonationScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    content: 'content',
    link: 'link',
    read: 'read',
    type: 'type',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    name: 'name',
    email: 'email',
    password: 'password',
    avatar: 'avatar',
    bio: 'bio',
    role: 'role'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const PresetOrderByRelevanceFieldEnum: {
    title: 'title',
    description: 'description',
    daw: 'daw',
    format: 'format',
    filePath: 'filePath',
    coverImage: 'coverImage',
    previewAudio: 'previewAudio'
  };

  export type PresetOrderByRelevanceFieldEnum = (typeof PresetOrderByRelevanceFieldEnum)[keyof typeof PresetOrderByRelevanceFieldEnum]


  export const TagOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type TagOrderByRelevanceFieldEnum = (typeof TagOrderByRelevanceFieldEnum)[keyof typeof TagOrderByRelevanceFieldEnum]


  export const DownloadHistoryOrderByRelevanceFieldEnum: {
    ipAddress: 'ipAddress'
  };

  export type DownloadHistoryOrderByRelevanceFieldEnum = (typeof DownloadHistoryOrderByRelevanceFieldEnum)[keyof typeof DownloadHistoryOrderByRelevanceFieldEnum]


  export const CommentOrderByRelevanceFieldEnum: {
    content: 'content'
  };

  export type CommentOrderByRelevanceFieldEnum = (typeof CommentOrderByRelevanceFieldEnum)[keyof typeof CommentOrderByRelevanceFieldEnum]


  export const DonationOrderByRelevanceFieldEnum: {
    currency: 'currency',
    message: 'message'
  };

  export type DonationOrderByRelevanceFieldEnum = (typeof DonationOrderByRelevanceFieldEnum)[keyof typeof DonationOrderByRelevanceFieldEnum]


  export const NotificationOrderByRelevanceFieldEnum: {
    title: 'title',
    content: 'content',
    link: 'link',
    type: 'type'
  };

  export type NotificationOrderByRelevanceFieldEnum = (typeof NotificationOrderByRelevanceFieldEnum)[keyof typeof NotificationOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    mustChangePassword?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    presets?: PresetListRelationFilter
    comments?: CommentListRelationFilter
    downloads?: DownloadHistoryListRelationFilter
    likes?: LikeListRelationFilter
    favorites?: FavoriteListRelationFilter
    donations?: DonationListRelationFilter
    receivedDonations?: DonationListRelationFilter
    notifications?: NotificationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    role?: SortOrder
    mustChangePassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    presets?: PresetOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    downloads?: DownloadHistoryOrderByRelationAggregateInput
    likes?: LikeOrderByRelationAggregateInput
    favorites?: FavoriteOrderByRelationAggregateInput
    donations?: DonationOrderByRelationAggregateInput
    receivedDonations?: DonationOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    mustChangePassword?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    presets?: PresetListRelationFilter
    comments?: CommentListRelationFilter
    downloads?: DownloadHistoryListRelationFilter
    likes?: LikeListRelationFilter
    favorites?: FavoriteListRelationFilter
    donations?: DonationListRelationFilter
    receivedDonations?: DonationListRelationFilter
    notifications?: NotificationListRelationFilter
  }, "id" | "name" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    role?: SortOrder
    mustChangePassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    mustChangePassword?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PresetWhereInput = {
    AND?: PresetWhereInput | PresetWhereInput[]
    OR?: PresetWhereInput[]
    NOT?: PresetWhereInput | PresetWhereInput[]
    id?: IntFilter<"Preset"> | number
    title?: StringFilter<"Preset"> | string
    description?: StringNullableFilter<"Preset"> | string | null
    daw?: StringFilter<"Preset"> | string
    format?: StringFilter<"Preset"> | string
    filePath?: StringFilter<"Preset"> | string
    fileSize?: IntFilter<"Preset"> | number
    files?: JsonNullableFilter<"Preset">
    coverImage?: StringNullableFilter<"Preset"> | string | null
    downloads?: IntFilter<"Preset"> | number
    likesCount?: IntFilter<"Preset"> | number
    favoritesCount?: IntFilter<"Preset"> | number
    isPublic?: BoolFilter<"Preset"> | boolean
    previewAudio?: StringNullableFilter<"Preset"> | string | null
    deletedAt?: DateTimeNullableFilter<"Preset"> | Date | string | null
    createdAt?: DateTimeFilter<"Preset"> | Date | string
    updatedAt?: DateTimeFilter<"Preset"> | Date | string
    userId?: IntFilter<"Preset"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tags?: TagOnPresetListRelationFilter
    comments?: CommentListRelationFilter
    downloadsLog?: DownloadHistoryListRelationFilter
    likes?: LikeListRelationFilter
    favorites?: FavoriteListRelationFilter
    donations?: DonationListRelationFilter
  }

  export type PresetOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    daw?: SortOrder
    format?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    files?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    downloads?: SortOrder
    likesCount?: SortOrder
    favoritesCount?: SortOrder
    isPublic?: SortOrder
    previewAudio?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    tags?: TagOnPresetOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    downloadsLog?: DownloadHistoryOrderByRelationAggregateInput
    likes?: LikeOrderByRelationAggregateInput
    favorites?: FavoriteOrderByRelationAggregateInput
    donations?: DonationOrderByRelationAggregateInput
    _relevance?: PresetOrderByRelevanceInput
  }

  export type PresetWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PresetWhereInput | PresetWhereInput[]
    OR?: PresetWhereInput[]
    NOT?: PresetWhereInput | PresetWhereInput[]
    title?: StringFilter<"Preset"> | string
    description?: StringNullableFilter<"Preset"> | string | null
    daw?: StringFilter<"Preset"> | string
    format?: StringFilter<"Preset"> | string
    filePath?: StringFilter<"Preset"> | string
    fileSize?: IntFilter<"Preset"> | number
    files?: JsonNullableFilter<"Preset">
    coverImage?: StringNullableFilter<"Preset"> | string | null
    downloads?: IntFilter<"Preset"> | number
    likesCount?: IntFilter<"Preset"> | number
    favoritesCount?: IntFilter<"Preset"> | number
    isPublic?: BoolFilter<"Preset"> | boolean
    previewAudio?: StringNullableFilter<"Preset"> | string | null
    deletedAt?: DateTimeNullableFilter<"Preset"> | Date | string | null
    createdAt?: DateTimeFilter<"Preset"> | Date | string
    updatedAt?: DateTimeFilter<"Preset"> | Date | string
    userId?: IntFilter<"Preset"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tags?: TagOnPresetListRelationFilter
    comments?: CommentListRelationFilter
    downloadsLog?: DownloadHistoryListRelationFilter
    likes?: LikeListRelationFilter
    favorites?: FavoriteListRelationFilter
    donations?: DonationListRelationFilter
  }, "id">

  export type PresetOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    daw?: SortOrder
    format?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    files?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    downloads?: SortOrder
    likesCount?: SortOrder
    favoritesCount?: SortOrder
    isPublic?: SortOrder
    previewAudio?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: PresetCountOrderByAggregateInput
    _avg?: PresetAvgOrderByAggregateInput
    _max?: PresetMaxOrderByAggregateInput
    _min?: PresetMinOrderByAggregateInput
    _sum?: PresetSumOrderByAggregateInput
  }

  export type PresetScalarWhereWithAggregatesInput = {
    AND?: PresetScalarWhereWithAggregatesInput | PresetScalarWhereWithAggregatesInput[]
    OR?: PresetScalarWhereWithAggregatesInput[]
    NOT?: PresetScalarWhereWithAggregatesInput | PresetScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Preset"> | number
    title?: StringWithAggregatesFilter<"Preset"> | string
    description?: StringNullableWithAggregatesFilter<"Preset"> | string | null
    daw?: StringWithAggregatesFilter<"Preset"> | string
    format?: StringWithAggregatesFilter<"Preset"> | string
    filePath?: StringWithAggregatesFilter<"Preset"> | string
    fileSize?: IntWithAggregatesFilter<"Preset"> | number
    files?: JsonNullableWithAggregatesFilter<"Preset">
    coverImage?: StringNullableWithAggregatesFilter<"Preset"> | string | null
    downloads?: IntWithAggregatesFilter<"Preset"> | number
    likesCount?: IntWithAggregatesFilter<"Preset"> | number
    favoritesCount?: IntWithAggregatesFilter<"Preset"> | number
    isPublic?: BoolWithAggregatesFilter<"Preset"> | boolean
    previewAudio?: StringNullableWithAggregatesFilter<"Preset"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Preset"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Preset"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Preset"> | Date | string
    userId?: IntWithAggregatesFilter<"Preset"> | number
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: IntFilter<"Tag"> | number
    name?: StringFilter<"Tag"> | string
    presets?: TagOnPresetListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    presets?: TagOnPresetOrderByRelationAggregateInput
    _relevance?: TagOrderByRelevanceInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    presets?: TagOnPresetListRelationFilter
  }, "id" | "name">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _avg?: TagAvgOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
    _sum?: TagSumOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Tag"> | number
    name?: StringWithAggregatesFilter<"Tag"> | string
  }

  export type TagOnPresetWhereInput = {
    AND?: TagOnPresetWhereInput | TagOnPresetWhereInput[]
    OR?: TagOnPresetWhereInput[]
    NOT?: TagOnPresetWhereInput | TagOnPresetWhereInput[]
    presetId?: IntFilter<"TagOnPreset"> | number
    tagId?: IntFilter<"TagOnPreset"> | number
    preset?: XOR<PresetScalarRelationFilter, PresetWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type TagOnPresetOrderByWithRelationInput = {
    presetId?: SortOrder
    tagId?: SortOrder
    preset?: PresetOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type TagOnPresetWhereUniqueInput = Prisma.AtLeast<{
    presetId_tagId?: TagOnPresetPresetIdTagIdCompoundUniqueInput
    AND?: TagOnPresetWhereInput | TagOnPresetWhereInput[]
    OR?: TagOnPresetWhereInput[]
    NOT?: TagOnPresetWhereInput | TagOnPresetWhereInput[]
    presetId?: IntFilter<"TagOnPreset"> | number
    tagId?: IntFilter<"TagOnPreset"> | number
    preset?: XOR<PresetScalarRelationFilter, PresetWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "presetId_tagId">

  export type TagOnPresetOrderByWithAggregationInput = {
    presetId?: SortOrder
    tagId?: SortOrder
    _count?: TagOnPresetCountOrderByAggregateInput
    _avg?: TagOnPresetAvgOrderByAggregateInput
    _max?: TagOnPresetMaxOrderByAggregateInput
    _min?: TagOnPresetMinOrderByAggregateInput
    _sum?: TagOnPresetSumOrderByAggregateInput
  }

  export type TagOnPresetScalarWhereWithAggregatesInput = {
    AND?: TagOnPresetScalarWhereWithAggregatesInput | TagOnPresetScalarWhereWithAggregatesInput[]
    OR?: TagOnPresetScalarWhereWithAggregatesInput[]
    NOT?: TagOnPresetScalarWhereWithAggregatesInput | TagOnPresetScalarWhereWithAggregatesInput[]
    presetId?: IntWithAggregatesFilter<"TagOnPreset"> | number
    tagId?: IntWithAggregatesFilter<"TagOnPreset"> | number
  }

  export type DownloadHistoryWhereInput = {
    AND?: DownloadHistoryWhereInput | DownloadHistoryWhereInput[]
    OR?: DownloadHistoryWhereInput[]
    NOT?: DownloadHistoryWhereInput | DownloadHistoryWhereInput[]
    id?: IntFilter<"DownloadHistory"> | number
    userId?: IntNullableFilter<"DownloadHistory"> | number | null
    presetId?: IntFilter<"DownloadHistory"> | number
    ipAddress?: StringNullableFilter<"DownloadHistory"> | string | null
    createdAt?: DateTimeFilter<"DownloadHistory"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    preset?: XOR<PresetScalarRelationFilter, PresetWhereInput>
  }

  export type DownloadHistoryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    presetId?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    preset?: PresetOrderByWithRelationInput
    _relevance?: DownloadHistoryOrderByRelevanceInput
  }

  export type DownloadHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    unique_user_preset_download?: DownloadHistoryUnique_user_preset_downloadCompoundUniqueInput
    AND?: DownloadHistoryWhereInput | DownloadHistoryWhereInput[]
    OR?: DownloadHistoryWhereInput[]
    NOT?: DownloadHistoryWhereInput | DownloadHistoryWhereInput[]
    userId?: IntNullableFilter<"DownloadHistory"> | number | null
    presetId?: IntFilter<"DownloadHistory"> | number
    ipAddress?: StringNullableFilter<"DownloadHistory"> | string | null
    createdAt?: DateTimeFilter<"DownloadHistory"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    preset?: XOR<PresetScalarRelationFilter, PresetWhereInput>
  }, "id" | "unique_user_preset_download">

  export type DownloadHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    presetId?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DownloadHistoryCountOrderByAggregateInput
    _avg?: DownloadHistoryAvgOrderByAggregateInput
    _max?: DownloadHistoryMaxOrderByAggregateInput
    _min?: DownloadHistoryMinOrderByAggregateInput
    _sum?: DownloadHistorySumOrderByAggregateInput
  }

  export type DownloadHistoryScalarWhereWithAggregatesInput = {
    AND?: DownloadHistoryScalarWhereWithAggregatesInput | DownloadHistoryScalarWhereWithAggregatesInput[]
    OR?: DownloadHistoryScalarWhereWithAggregatesInput[]
    NOT?: DownloadHistoryScalarWhereWithAggregatesInput | DownloadHistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DownloadHistory"> | number
    userId?: IntNullableWithAggregatesFilter<"DownloadHistory"> | number | null
    presetId?: IntWithAggregatesFilter<"DownloadHistory"> | number
    ipAddress?: StringNullableWithAggregatesFilter<"DownloadHistory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DownloadHistory"> | Date | string
  }

  export type LikeWhereInput = {
    AND?: LikeWhereInput | LikeWhereInput[]
    OR?: LikeWhereInput[]
    NOT?: LikeWhereInput | LikeWhereInput[]
    id?: IntFilter<"Like"> | number
    userId?: IntFilter<"Like"> | number
    presetId?: IntFilter<"Like"> | number
    createdAt?: DateTimeFilter<"Like"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    preset?: XOR<PresetScalarRelationFilter, PresetWhereInput>
  }

  export type LikeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    preset?: PresetOrderByWithRelationInput
  }

  export type LikeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_presetId?: LikeUserIdPresetIdCompoundUniqueInput
    AND?: LikeWhereInput | LikeWhereInput[]
    OR?: LikeWhereInput[]
    NOT?: LikeWhereInput | LikeWhereInput[]
    userId?: IntFilter<"Like"> | number
    presetId?: IntFilter<"Like"> | number
    createdAt?: DateTimeFilter<"Like"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    preset?: XOR<PresetScalarRelationFilter, PresetWhereInput>
  }, "id" | "userId_presetId">

  export type LikeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
    createdAt?: SortOrder
    _count?: LikeCountOrderByAggregateInput
    _avg?: LikeAvgOrderByAggregateInput
    _max?: LikeMaxOrderByAggregateInput
    _min?: LikeMinOrderByAggregateInput
    _sum?: LikeSumOrderByAggregateInput
  }

  export type LikeScalarWhereWithAggregatesInput = {
    AND?: LikeScalarWhereWithAggregatesInput | LikeScalarWhereWithAggregatesInput[]
    OR?: LikeScalarWhereWithAggregatesInput[]
    NOT?: LikeScalarWhereWithAggregatesInput | LikeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Like"> | number
    userId?: IntWithAggregatesFilter<"Like"> | number
    presetId?: IntWithAggregatesFilter<"Like"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Like"> | Date | string
  }

  export type FavoriteWhereInput = {
    AND?: FavoriteWhereInput | FavoriteWhereInput[]
    OR?: FavoriteWhereInput[]
    NOT?: FavoriteWhereInput | FavoriteWhereInput[]
    id?: IntFilter<"Favorite"> | number
    userId?: IntFilter<"Favorite"> | number
    presetId?: IntFilter<"Favorite"> | number
    createdAt?: DateTimeFilter<"Favorite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    preset?: XOR<PresetScalarRelationFilter, PresetWhereInput>
  }

  export type FavoriteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    preset?: PresetOrderByWithRelationInput
  }

  export type FavoriteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_presetId?: FavoriteUserIdPresetIdCompoundUniqueInput
    AND?: FavoriteWhereInput | FavoriteWhereInput[]
    OR?: FavoriteWhereInput[]
    NOT?: FavoriteWhereInput | FavoriteWhereInput[]
    userId?: IntFilter<"Favorite"> | number
    presetId?: IntFilter<"Favorite"> | number
    createdAt?: DateTimeFilter<"Favorite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    preset?: XOR<PresetScalarRelationFilter, PresetWhereInput>
  }, "id" | "userId_presetId">

  export type FavoriteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
    createdAt?: SortOrder
    _count?: FavoriteCountOrderByAggregateInput
    _avg?: FavoriteAvgOrderByAggregateInput
    _max?: FavoriteMaxOrderByAggregateInput
    _min?: FavoriteMinOrderByAggregateInput
    _sum?: FavoriteSumOrderByAggregateInput
  }

  export type FavoriteScalarWhereWithAggregatesInput = {
    AND?: FavoriteScalarWhereWithAggregatesInput | FavoriteScalarWhereWithAggregatesInput[]
    OR?: FavoriteScalarWhereWithAggregatesInput[]
    NOT?: FavoriteScalarWhereWithAggregatesInput | FavoriteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Favorite"> | number
    userId?: IntWithAggregatesFilter<"Favorite"> | number
    presetId?: IntWithAggregatesFilter<"Favorite"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Favorite"> | Date | string
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: IntFilter<"Comment"> | number
    content?: StringFilter<"Comment"> | string
    presetId?: IntFilter<"Comment"> | number
    userId?: IntFilter<"Comment"> | number
    parentId?: IntNullableFilter<"Comment"> | number | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    preset?: XOR<PresetScalarRelationFilter, PresetWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    presetId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    preset?: PresetOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    _relevance?: CommentOrderByRelevanceInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    content?: StringFilter<"Comment"> | string
    presetId?: IntFilter<"Comment"> | number
    userId?: IntFilter<"Comment"> | number
    parentId?: IntNullableFilter<"Comment"> | number | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    preset?: XOR<PresetScalarRelationFilter, PresetWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    presetId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _avg?: CommentAvgOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
    _sum?: CommentSumOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Comment"> | number
    content?: StringWithAggregatesFilter<"Comment"> | string
    presetId?: IntWithAggregatesFilter<"Comment"> | number
    userId?: IntWithAggregatesFilter<"Comment"> | number
    parentId?: IntNullableWithAggregatesFilter<"Comment"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
  }

  export type DonationWhereInput = {
    AND?: DonationWhereInput | DonationWhereInput[]
    OR?: DonationWhereInput[]
    NOT?: DonationWhereInput | DonationWhereInput[]
    id?: IntFilter<"Donation"> | number
    amount?: IntFilter<"Donation"> | number
    currency?: StringFilter<"Donation"> | string
    donorId?: IntFilter<"Donation"> | number
    creatorId?: IntFilter<"Donation"> | number
    presetId?: IntNullableFilter<"Donation"> | number | null
    message?: StringNullableFilter<"Donation"> | string | null
    createdAt?: DateTimeFilter<"Donation"> | Date | string
    donor?: XOR<UserScalarRelationFilter, UserWhereInput>
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    preset?: XOR<PresetNullableScalarRelationFilter, PresetWhereInput> | null
  }

  export type DonationOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    donorId?: SortOrder
    creatorId?: SortOrder
    presetId?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    donor?: UserOrderByWithRelationInput
    creator?: UserOrderByWithRelationInput
    preset?: PresetOrderByWithRelationInput
    _relevance?: DonationOrderByRelevanceInput
  }

  export type DonationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DonationWhereInput | DonationWhereInput[]
    OR?: DonationWhereInput[]
    NOT?: DonationWhereInput | DonationWhereInput[]
    amount?: IntFilter<"Donation"> | number
    currency?: StringFilter<"Donation"> | string
    donorId?: IntFilter<"Donation"> | number
    creatorId?: IntFilter<"Donation"> | number
    presetId?: IntNullableFilter<"Donation"> | number | null
    message?: StringNullableFilter<"Donation"> | string | null
    createdAt?: DateTimeFilter<"Donation"> | Date | string
    donor?: XOR<UserScalarRelationFilter, UserWhereInput>
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    preset?: XOR<PresetNullableScalarRelationFilter, PresetWhereInput> | null
  }, "id">

  export type DonationOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    donorId?: SortOrder
    creatorId?: SortOrder
    presetId?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DonationCountOrderByAggregateInput
    _avg?: DonationAvgOrderByAggregateInput
    _max?: DonationMaxOrderByAggregateInput
    _min?: DonationMinOrderByAggregateInput
    _sum?: DonationSumOrderByAggregateInput
  }

  export type DonationScalarWhereWithAggregatesInput = {
    AND?: DonationScalarWhereWithAggregatesInput | DonationScalarWhereWithAggregatesInput[]
    OR?: DonationScalarWhereWithAggregatesInput[]
    NOT?: DonationScalarWhereWithAggregatesInput | DonationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Donation"> | number
    amount?: IntWithAggregatesFilter<"Donation"> | number
    currency?: StringWithAggregatesFilter<"Donation"> | string
    donorId?: IntWithAggregatesFilter<"Donation"> | number
    creatorId?: IntWithAggregatesFilter<"Donation"> | number
    presetId?: IntNullableWithAggregatesFilter<"Donation"> | number | null
    message?: StringNullableWithAggregatesFilter<"Donation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Donation"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: IntFilter<"Notification"> | number
    title?: StringFilter<"Notification"> | string
    content?: StringFilter<"Notification"> | string
    link?: StringNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    type?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    link?: SortOrderInput | SortOrder
    read?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: NotificationOrderByRelevanceInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: IntFilter<"Notification"> | number
    title?: StringFilter<"Notification"> | string
    content?: StringFilter<"Notification"> | string
    link?: StringNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    type?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    link?: SortOrderInput | SortOrder
    read?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Notification"> | number
    userId?: IntWithAggregatesFilter<"Notification"> | number
    title?: StringWithAggregatesFilter<"Notification"> | string
    content?: StringWithAggregatesFilter<"Notification"> | string
    link?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    read?: BoolWithAggregatesFilter<"Notification"> | boolean
    type?: StringWithAggregatesFilter<"Notification"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type UserCreateInput = {
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryCreateNestedManyWithoutUserInput
    likes?: LikeCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    donations?: DonationCreateNestedManyWithoutDonorInput
    receivedDonations?: DonationCreateNestedManyWithoutCreatorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryUncheckedCreateNestedManyWithoutUserInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    donations?: DonationUncheckedCreateNestedManyWithoutDonorInput
    receivedDonations?: DonationUncheckedCreateNestedManyWithoutCreatorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUpdateManyWithoutUserNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    donations?: DonationUpdateManyWithoutDonorNestedInput
    receivedDonations?: DonationUpdateManyWithoutCreatorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUncheckedUpdateManyWithoutUserNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    donations?: DonationUncheckedUpdateManyWithoutDonorNestedInput
    receivedDonations?: DonationUncheckedUpdateManyWithoutCreatorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PresetCreateInput = {
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPresetsInput
    tags?: TagOnPresetCreateNestedManyWithoutPresetInput
    comments?: CommentCreateNestedManyWithoutPresetInput
    downloadsLog?: DownloadHistoryCreateNestedManyWithoutPresetInput
    likes?: LikeCreateNestedManyWithoutPresetInput
    favorites?: FavoriteCreateNestedManyWithoutPresetInput
    donations?: DonationCreateNestedManyWithoutPresetInput
  }

  export type PresetUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    tags?: TagOnPresetUncheckedCreateNestedManyWithoutPresetInput
    comments?: CommentUncheckedCreateNestedManyWithoutPresetInput
    downloadsLog?: DownloadHistoryUncheckedCreateNestedManyWithoutPresetInput
    likes?: LikeUncheckedCreateNestedManyWithoutPresetInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutPresetInput
    donations?: DonationUncheckedCreateNestedManyWithoutPresetInput
  }

  export type PresetUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPresetsNestedInput
    tags?: TagOnPresetUpdateManyWithoutPresetNestedInput
    comments?: CommentUpdateManyWithoutPresetNestedInput
    downloadsLog?: DownloadHistoryUpdateManyWithoutPresetNestedInput
    likes?: LikeUpdateManyWithoutPresetNestedInput
    favorites?: FavoriteUpdateManyWithoutPresetNestedInput
    donations?: DonationUpdateManyWithoutPresetNestedInput
  }

  export type PresetUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    tags?: TagOnPresetUncheckedUpdateManyWithoutPresetNestedInput
    comments?: CommentUncheckedUpdateManyWithoutPresetNestedInput
    downloadsLog?: DownloadHistoryUncheckedUpdateManyWithoutPresetNestedInput
    likes?: LikeUncheckedUpdateManyWithoutPresetNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutPresetNestedInput
    donations?: DonationUncheckedUpdateManyWithoutPresetNestedInput
  }

  export type PresetCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
  }

  export type PresetUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PresetUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TagCreateInput = {
    name: string
    presets?: TagOnPresetCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateInput = {
    id?: number
    name: string
    presets?: TagOnPresetUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    presets?: TagOnPresetUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    presets?: TagOnPresetUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagCreateManyInput = {
    id?: number
    name: string
  }

  export type TagUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagOnPresetCreateInput = {
    preset: PresetCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutPresetsInput
  }

  export type TagOnPresetUncheckedCreateInput = {
    presetId: number
    tagId: number
  }

  export type TagOnPresetUpdateInput = {
    preset?: PresetUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutPresetsNestedInput
  }

  export type TagOnPresetUncheckedUpdateInput = {
    presetId?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type TagOnPresetCreateManyInput = {
    presetId: number
    tagId: number
  }

  export type TagOnPresetUpdateManyMutationInput = {

  }

  export type TagOnPresetUncheckedUpdateManyInput = {
    presetId?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type DownloadHistoryCreateInput = {
    ipAddress?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutDownloadsInput
    preset: PresetCreateNestedOneWithoutDownloadsLogInput
  }

  export type DownloadHistoryUncheckedCreateInput = {
    id?: number
    userId?: number | null
    presetId: number
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type DownloadHistoryUpdateInput = {
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutDownloadsNestedInput
    preset?: PresetUpdateOneRequiredWithoutDownloadsLogNestedInput
  }

  export type DownloadHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    presetId?: IntFieldUpdateOperationsInput | number
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DownloadHistoryCreateManyInput = {
    id?: number
    userId?: number | null
    presetId: number
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type DownloadHistoryUpdateManyMutationInput = {
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DownloadHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    presetId?: IntFieldUpdateOperationsInput | number
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeCreateInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLikesInput
    preset: PresetCreateNestedOneWithoutLikesInput
  }

  export type LikeUncheckedCreateInput = {
    id?: number
    userId: number
    presetId: number
    createdAt?: Date | string
  }

  export type LikeUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLikesNestedInput
    preset?: PresetUpdateOneRequiredWithoutLikesNestedInput
  }

  export type LikeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    presetId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeCreateManyInput = {
    id?: number
    userId: number
    presetId: number
    createdAt?: Date | string
  }

  export type LikeUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    presetId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteCreateInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritesInput
    preset: PresetCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateInput = {
    id?: number
    userId: number
    presetId: number
    createdAt?: Date | string
  }

  export type FavoriteUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
    preset?: PresetUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    presetId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteCreateManyInput = {
    id?: number
    userId: number
    presetId: number
    createdAt?: Date | string
  }

  export type FavoriteUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    presetId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateInput = {
    content: string
    parentId?: number | null
    createdAt?: Date | string
    preset: PresetCreateNestedOneWithoutCommentsInput
    user: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: number
    content: string
    presetId: number
    userId: number
    parentId?: number | null
    createdAt?: Date | string
  }

  export type CommentUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preset?: PresetUpdateOneRequiredWithoutCommentsNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    presetId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyInput = {
    id?: number
    content: string
    presetId: number
    userId: number
    parentId?: number | null
    createdAt?: Date | string
  }

  export type CommentUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    presetId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonationCreateInput = {
    amount: number
    currency?: string
    message?: string | null
    createdAt?: Date | string
    donor: UserCreateNestedOneWithoutDonationsInput
    creator: UserCreateNestedOneWithoutReceivedDonationsInput
    preset?: PresetCreateNestedOneWithoutDonationsInput
  }

  export type DonationUncheckedCreateInput = {
    id?: number
    amount: number
    currency?: string
    donorId: number
    creatorId: number
    presetId?: number | null
    message?: string | null
    createdAt?: Date | string
  }

  export type DonationUpdateInput = {
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    donor?: UserUpdateOneRequiredWithoutDonationsNestedInput
    creator?: UserUpdateOneRequiredWithoutReceivedDonationsNestedInput
    preset?: PresetUpdateOneWithoutDonationsNestedInput
  }

  export type DonationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    donorId?: IntFieldUpdateOperationsInput | number
    creatorId?: IntFieldUpdateOperationsInput | number
    presetId?: NullableIntFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonationCreateManyInput = {
    id?: number
    amount: number
    currency?: string
    donorId: number
    creatorId: number
    presetId?: number | null
    message?: string | null
    createdAt?: Date | string
  }

  export type DonationUpdateManyMutationInput = {
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    donorId?: IntFieldUpdateOperationsInput | number
    creatorId?: IntFieldUpdateOperationsInput | number
    presetId?: NullableIntFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    title: string
    content: string
    link?: string | null
    read?: boolean
    type: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: number
    userId: number
    title: string
    content: string
    link?: string | null
    read?: boolean
    type: string
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: number
    userId: number
    title: string
    content: string
    link?: string | null
    read?: boolean
    type: string
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PresetListRelationFilter = {
    every?: PresetWhereInput
    some?: PresetWhereInput
    none?: PresetWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type DownloadHistoryListRelationFilter = {
    every?: DownloadHistoryWhereInput
    some?: DownloadHistoryWhereInput
    none?: DownloadHistoryWhereInput
  }

  export type LikeListRelationFilter = {
    every?: LikeWhereInput
    some?: LikeWhereInput
    none?: LikeWhereInput
  }

  export type FavoriteListRelationFilter = {
    every?: FavoriteWhereInput
    some?: FavoriteWhereInput
    none?: FavoriteWhereInput
  }

  export type DonationListRelationFilter = {
    every?: DonationWhereInput
    some?: DonationWhereInput
    none?: DonationWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PresetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DownloadHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FavoriteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DonationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    role?: SortOrder
    mustChangePassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    role?: SortOrder
    mustChangePassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    role?: SortOrder
    mustChangePassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TagOnPresetListRelationFilter = {
    every?: TagOnPresetWhereInput
    some?: TagOnPresetWhereInput
    none?: TagOnPresetWhereInput
  }

  export type TagOnPresetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PresetOrderByRelevanceInput = {
    fields: PresetOrderByRelevanceFieldEnum | PresetOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PresetCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    daw?: SortOrder
    format?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    files?: SortOrder
    coverImage?: SortOrder
    downloads?: SortOrder
    likesCount?: SortOrder
    favoritesCount?: SortOrder
    isPublic?: SortOrder
    previewAudio?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type PresetAvgOrderByAggregateInput = {
    id?: SortOrder
    fileSize?: SortOrder
    downloads?: SortOrder
    likesCount?: SortOrder
    favoritesCount?: SortOrder
    userId?: SortOrder
  }

  export type PresetMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    daw?: SortOrder
    format?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    coverImage?: SortOrder
    downloads?: SortOrder
    likesCount?: SortOrder
    favoritesCount?: SortOrder
    isPublic?: SortOrder
    previewAudio?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type PresetMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    daw?: SortOrder
    format?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    coverImage?: SortOrder
    downloads?: SortOrder
    likesCount?: SortOrder
    favoritesCount?: SortOrder
    isPublic?: SortOrder
    previewAudio?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type PresetSumOrderByAggregateInput = {
    id?: SortOrder
    fileSize?: SortOrder
    downloads?: SortOrder
    likesCount?: SortOrder
    favoritesCount?: SortOrder
    userId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TagOrderByRelevanceInput = {
    fields: TagOrderByRelevanceFieldEnum | TagOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PresetScalarRelationFilter = {
    is?: PresetWhereInput
    isNot?: PresetWhereInput
  }

  export type TagScalarRelationFilter = {
    is?: TagWhereInput
    isNot?: TagWhereInput
  }

  export type TagOnPresetPresetIdTagIdCompoundUniqueInput = {
    presetId: number
    tagId: number
  }

  export type TagOnPresetCountOrderByAggregateInput = {
    presetId?: SortOrder
    tagId?: SortOrder
  }

  export type TagOnPresetAvgOrderByAggregateInput = {
    presetId?: SortOrder
    tagId?: SortOrder
  }

  export type TagOnPresetMaxOrderByAggregateInput = {
    presetId?: SortOrder
    tagId?: SortOrder
  }

  export type TagOnPresetMinOrderByAggregateInput = {
    presetId?: SortOrder
    tagId?: SortOrder
  }

  export type TagOnPresetSumOrderByAggregateInput = {
    presetId?: SortOrder
    tagId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type DownloadHistoryOrderByRelevanceInput = {
    fields: DownloadHistoryOrderByRelevanceFieldEnum | DownloadHistoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type DownloadHistoryUnique_user_preset_downloadCompoundUniqueInput = {
    userId: number
    presetId: number
  }

  export type DownloadHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type DownloadHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
  }

  export type DownloadHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type DownloadHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type DownloadHistorySumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type LikeUserIdPresetIdCompoundUniqueInput = {
    userId: number
    presetId: number
  }

  export type LikeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
    createdAt?: SortOrder
  }

  export type LikeAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
  }

  export type LikeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
    createdAt?: SortOrder
  }

  export type LikeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
    createdAt?: SortOrder
  }

  export type LikeSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
  }

  export type FavoriteUserIdPresetIdCompoundUniqueInput = {
    userId: number
    presetId: number
  }

  export type FavoriteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
  }

  export type FavoriteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    presetId?: SortOrder
  }

  export type CommentOrderByRelevanceInput = {
    fields: CommentOrderByRelevanceFieldEnum | CommentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    presetId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentAvgOrderByAggregateInput = {
    id?: SortOrder
    presetId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    presetId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    presetId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentSumOrderByAggregateInput = {
    id?: SortOrder
    presetId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
  }

  export type PresetNullableScalarRelationFilter = {
    is?: PresetWhereInput | null
    isNot?: PresetWhereInput | null
  }

  export type DonationOrderByRelevanceInput = {
    fields: DonationOrderByRelevanceFieldEnum | DonationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type DonationCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    donorId?: SortOrder
    creatorId?: SortOrder
    presetId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type DonationAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    donorId?: SortOrder
    creatorId?: SortOrder
    presetId?: SortOrder
  }

  export type DonationMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    donorId?: SortOrder
    creatorId?: SortOrder
    presetId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type DonationMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    donorId?: SortOrder
    creatorId?: SortOrder
    presetId?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type DonationSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    donorId?: SortOrder
    creatorId?: SortOrder
    presetId?: SortOrder
  }

  export type NotificationOrderByRelevanceInput = {
    fields: NotificationOrderByRelevanceFieldEnum | NotificationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    link?: SortOrder
    read?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    link?: SortOrder
    read?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    link?: SortOrder
    read?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type PresetCreateNestedManyWithoutUserInput = {
    create?: XOR<PresetCreateWithoutUserInput, PresetUncheckedCreateWithoutUserInput> | PresetCreateWithoutUserInput[] | PresetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PresetCreateOrConnectWithoutUserInput | PresetCreateOrConnectWithoutUserInput[]
    createMany?: PresetCreateManyUserInputEnvelope
    connect?: PresetWhereUniqueInput | PresetWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type DownloadHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<DownloadHistoryCreateWithoutUserInput, DownloadHistoryUncheckedCreateWithoutUserInput> | DownloadHistoryCreateWithoutUserInput[] | DownloadHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DownloadHistoryCreateOrConnectWithoutUserInput | DownloadHistoryCreateOrConnectWithoutUserInput[]
    createMany?: DownloadHistoryCreateManyUserInputEnvelope
    connect?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
  }

  export type LikeCreateNestedManyWithoutUserInput = {
    create?: XOR<LikeCreateWithoutUserInput, LikeUncheckedCreateWithoutUserInput> | LikeCreateWithoutUserInput[] | LikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutUserInput | LikeCreateOrConnectWithoutUserInput[]
    createMany?: LikeCreateManyUserInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type FavoriteCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type DonationCreateNestedManyWithoutDonorInput = {
    create?: XOR<DonationCreateWithoutDonorInput, DonationUncheckedCreateWithoutDonorInput> | DonationCreateWithoutDonorInput[] | DonationUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutDonorInput | DonationCreateOrConnectWithoutDonorInput[]
    createMany?: DonationCreateManyDonorInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type DonationCreateNestedManyWithoutCreatorInput = {
    create?: XOR<DonationCreateWithoutCreatorInput, DonationUncheckedCreateWithoutCreatorInput> | DonationCreateWithoutCreatorInput[] | DonationUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCreatorInput | DonationCreateOrConnectWithoutCreatorInput[]
    createMany?: DonationCreateManyCreatorInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type PresetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PresetCreateWithoutUserInput, PresetUncheckedCreateWithoutUserInput> | PresetCreateWithoutUserInput[] | PresetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PresetCreateOrConnectWithoutUserInput | PresetCreateOrConnectWithoutUserInput[]
    createMany?: PresetCreateManyUserInputEnvelope
    connect?: PresetWhereUniqueInput | PresetWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type DownloadHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DownloadHistoryCreateWithoutUserInput, DownloadHistoryUncheckedCreateWithoutUserInput> | DownloadHistoryCreateWithoutUserInput[] | DownloadHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DownloadHistoryCreateOrConnectWithoutUserInput | DownloadHistoryCreateOrConnectWithoutUserInput[]
    createMany?: DownloadHistoryCreateManyUserInputEnvelope
    connect?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
  }

  export type LikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LikeCreateWithoutUserInput, LikeUncheckedCreateWithoutUserInput> | LikeCreateWithoutUserInput[] | LikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutUserInput | LikeCreateOrConnectWithoutUserInput[]
    createMany?: LikeCreateManyUserInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type FavoriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type DonationUncheckedCreateNestedManyWithoutDonorInput = {
    create?: XOR<DonationCreateWithoutDonorInput, DonationUncheckedCreateWithoutDonorInput> | DonationCreateWithoutDonorInput[] | DonationUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutDonorInput | DonationCreateOrConnectWithoutDonorInput[]
    createMany?: DonationCreateManyDonorInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type DonationUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<DonationCreateWithoutCreatorInput, DonationUncheckedCreateWithoutCreatorInput> | DonationCreateWithoutCreatorInput[] | DonationUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCreatorInput | DonationCreateOrConnectWithoutCreatorInput[]
    createMany?: DonationCreateManyCreatorInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PresetUpdateManyWithoutUserNestedInput = {
    create?: XOR<PresetCreateWithoutUserInput, PresetUncheckedCreateWithoutUserInput> | PresetCreateWithoutUserInput[] | PresetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PresetCreateOrConnectWithoutUserInput | PresetCreateOrConnectWithoutUserInput[]
    upsert?: PresetUpsertWithWhereUniqueWithoutUserInput | PresetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PresetCreateManyUserInputEnvelope
    set?: PresetWhereUniqueInput | PresetWhereUniqueInput[]
    disconnect?: PresetWhereUniqueInput | PresetWhereUniqueInput[]
    delete?: PresetWhereUniqueInput | PresetWhereUniqueInput[]
    connect?: PresetWhereUniqueInput | PresetWhereUniqueInput[]
    update?: PresetUpdateWithWhereUniqueWithoutUserInput | PresetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PresetUpdateManyWithWhereWithoutUserInput | PresetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PresetScalarWhereInput | PresetScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type DownloadHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<DownloadHistoryCreateWithoutUserInput, DownloadHistoryUncheckedCreateWithoutUserInput> | DownloadHistoryCreateWithoutUserInput[] | DownloadHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DownloadHistoryCreateOrConnectWithoutUserInput | DownloadHistoryCreateOrConnectWithoutUserInput[]
    upsert?: DownloadHistoryUpsertWithWhereUniqueWithoutUserInput | DownloadHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DownloadHistoryCreateManyUserInputEnvelope
    set?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    disconnect?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    delete?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    connect?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    update?: DownloadHistoryUpdateWithWhereUniqueWithoutUserInput | DownloadHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DownloadHistoryUpdateManyWithWhereWithoutUserInput | DownloadHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DownloadHistoryScalarWhereInput | DownloadHistoryScalarWhereInput[]
  }

  export type LikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<LikeCreateWithoutUserInput, LikeUncheckedCreateWithoutUserInput> | LikeCreateWithoutUserInput[] | LikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutUserInput | LikeCreateOrConnectWithoutUserInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutUserInput | LikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LikeCreateManyUserInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutUserInput | LikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutUserInput | LikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type FavoriteUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutUserInput | FavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutUserInput | FavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutUserInput | FavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type DonationUpdateManyWithoutDonorNestedInput = {
    create?: XOR<DonationCreateWithoutDonorInput, DonationUncheckedCreateWithoutDonorInput> | DonationCreateWithoutDonorInput[] | DonationUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutDonorInput | DonationCreateOrConnectWithoutDonorInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutDonorInput | DonationUpsertWithWhereUniqueWithoutDonorInput[]
    createMany?: DonationCreateManyDonorInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutDonorInput | DonationUpdateWithWhereUniqueWithoutDonorInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutDonorInput | DonationUpdateManyWithWhereWithoutDonorInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type DonationUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<DonationCreateWithoutCreatorInput, DonationUncheckedCreateWithoutCreatorInput> | DonationCreateWithoutCreatorInput[] | DonationUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCreatorInput | DonationCreateOrConnectWithoutCreatorInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutCreatorInput | DonationUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: DonationCreateManyCreatorInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutCreatorInput | DonationUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutCreatorInput | DonationUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PresetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PresetCreateWithoutUserInput, PresetUncheckedCreateWithoutUserInput> | PresetCreateWithoutUserInput[] | PresetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PresetCreateOrConnectWithoutUserInput | PresetCreateOrConnectWithoutUserInput[]
    upsert?: PresetUpsertWithWhereUniqueWithoutUserInput | PresetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PresetCreateManyUserInputEnvelope
    set?: PresetWhereUniqueInput | PresetWhereUniqueInput[]
    disconnect?: PresetWhereUniqueInput | PresetWhereUniqueInput[]
    delete?: PresetWhereUniqueInput | PresetWhereUniqueInput[]
    connect?: PresetWhereUniqueInput | PresetWhereUniqueInput[]
    update?: PresetUpdateWithWhereUniqueWithoutUserInput | PresetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PresetUpdateManyWithWhereWithoutUserInput | PresetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PresetScalarWhereInput | PresetScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type DownloadHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DownloadHistoryCreateWithoutUserInput, DownloadHistoryUncheckedCreateWithoutUserInput> | DownloadHistoryCreateWithoutUserInput[] | DownloadHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DownloadHistoryCreateOrConnectWithoutUserInput | DownloadHistoryCreateOrConnectWithoutUserInput[]
    upsert?: DownloadHistoryUpsertWithWhereUniqueWithoutUserInput | DownloadHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DownloadHistoryCreateManyUserInputEnvelope
    set?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    disconnect?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    delete?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    connect?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    update?: DownloadHistoryUpdateWithWhereUniqueWithoutUserInput | DownloadHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DownloadHistoryUpdateManyWithWhereWithoutUserInput | DownloadHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DownloadHistoryScalarWhereInput | DownloadHistoryScalarWhereInput[]
  }

  export type LikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LikeCreateWithoutUserInput, LikeUncheckedCreateWithoutUserInput> | LikeCreateWithoutUserInput[] | LikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutUserInput | LikeCreateOrConnectWithoutUserInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutUserInput | LikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LikeCreateManyUserInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutUserInput | LikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutUserInput | LikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type FavoriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutUserInput | FavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutUserInput | FavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutUserInput | FavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type DonationUncheckedUpdateManyWithoutDonorNestedInput = {
    create?: XOR<DonationCreateWithoutDonorInput, DonationUncheckedCreateWithoutDonorInput> | DonationCreateWithoutDonorInput[] | DonationUncheckedCreateWithoutDonorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutDonorInput | DonationCreateOrConnectWithoutDonorInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutDonorInput | DonationUpsertWithWhereUniqueWithoutDonorInput[]
    createMany?: DonationCreateManyDonorInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutDonorInput | DonationUpdateWithWhereUniqueWithoutDonorInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutDonorInput | DonationUpdateManyWithWhereWithoutDonorInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type DonationUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<DonationCreateWithoutCreatorInput, DonationUncheckedCreateWithoutCreatorInput> | DonationCreateWithoutCreatorInput[] | DonationUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutCreatorInput | DonationCreateOrConnectWithoutCreatorInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutCreatorInput | DonationUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: DonationCreateManyCreatorInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutCreatorInput | DonationUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutCreatorInput | DonationUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPresetsInput = {
    create?: XOR<UserCreateWithoutPresetsInput, UserUncheckedCreateWithoutPresetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPresetsInput
    connect?: UserWhereUniqueInput
  }

  export type TagOnPresetCreateNestedManyWithoutPresetInput = {
    create?: XOR<TagOnPresetCreateWithoutPresetInput, TagOnPresetUncheckedCreateWithoutPresetInput> | TagOnPresetCreateWithoutPresetInput[] | TagOnPresetUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: TagOnPresetCreateOrConnectWithoutPresetInput | TagOnPresetCreateOrConnectWithoutPresetInput[]
    createMany?: TagOnPresetCreateManyPresetInputEnvelope
    connect?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutPresetInput = {
    create?: XOR<CommentCreateWithoutPresetInput, CommentUncheckedCreateWithoutPresetInput> | CommentCreateWithoutPresetInput[] | CommentUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPresetInput | CommentCreateOrConnectWithoutPresetInput[]
    createMany?: CommentCreateManyPresetInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type DownloadHistoryCreateNestedManyWithoutPresetInput = {
    create?: XOR<DownloadHistoryCreateWithoutPresetInput, DownloadHistoryUncheckedCreateWithoutPresetInput> | DownloadHistoryCreateWithoutPresetInput[] | DownloadHistoryUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: DownloadHistoryCreateOrConnectWithoutPresetInput | DownloadHistoryCreateOrConnectWithoutPresetInput[]
    createMany?: DownloadHistoryCreateManyPresetInputEnvelope
    connect?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
  }

  export type LikeCreateNestedManyWithoutPresetInput = {
    create?: XOR<LikeCreateWithoutPresetInput, LikeUncheckedCreateWithoutPresetInput> | LikeCreateWithoutPresetInput[] | LikeUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutPresetInput | LikeCreateOrConnectWithoutPresetInput[]
    createMany?: LikeCreateManyPresetInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type FavoriteCreateNestedManyWithoutPresetInput = {
    create?: XOR<FavoriteCreateWithoutPresetInput, FavoriteUncheckedCreateWithoutPresetInput> | FavoriteCreateWithoutPresetInput[] | FavoriteUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutPresetInput | FavoriteCreateOrConnectWithoutPresetInput[]
    createMany?: FavoriteCreateManyPresetInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type DonationCreateNestedManyWithoutPresetInput = {
    create?: XOR<DonationCreateWithoutPresetInput, DonationUncheckedCreateWithoutPresetInput> | DonationCreateWithoutPresetInput[] | DonationUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutPresetInput | DonationCreateOrConnectWithoutPresetInput[]
    createMany?: DonationCreateManyPresetInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type TagOnPresetUncheckedCreateNestedManyWithoutPresetInput = {
    create?: XOR<TagOnPresetCreateWithoutPresetInput, TagOnPresetUncheckedCreateWithoutPresetInput> | TagOnPresetCreateWithoutPresetInput[] | TagOnPresetUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: TagOnPresetCreateOrConnectWithoutPresetInput | TagOnPresetCreateOrConnectWithoutPresetInput[]
    createMany?: TagOnPresetCreateManyPresetInputEnvelope
    connect?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutPresetInput = {
    create?: XOR<CommentCreateWithoutPresetInput, CommentUncheckedCreateWithoutPresetInput> | CommentCreateWithoutPresetInput[] | CommentUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPresetInput | CommentCreateOrConnectWithoutPresetInput[]
    createMany?: CommentCreateManyPresetInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type DownloadHistoryUncheckedCreateNestedManyWithoutPresetInput = {
    create?: XOR<DownloadHistoryCreateWithoutPresetInput, DownloadHistoryUncheckedCreateWithoutPresetInput> | DownloadHistoryCreateWithoutPresetInput[] | DownloadHistoryUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: DownloadHistoryCreateOrConnectWithoutPresetInput | DownloadHistoryCreateOrConnectWithoutPresetInput[]
    createMany?: DownloadHistoryCreateManyPresetInputEnvelope
    connect?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
  }

  export type LikeUncheckedCreateNestedManyWithoutPresetInput = {
    create?: XOR<LikeCreateWithoutPresetInput, LikeUncheckedCreateWithoutPresetInput> | LikeCreateWithoutPresetInput[] | LikeUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutPresetInput | LikeCreateOrConnectWithoutPresetInput[]
    createMany?: LikeCreateManyPresetInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type FavoriteUncheckedCreateNestedManyWithoutPresetInput = {
    create?: XOR<FavoriteCreateWithoutPresetInput, FavoriteUncheckedCreateWithoutPresetInput> | FavoriteCreateWithoutPresetInput[] | FavoriteUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutPresetInput | FavoriteCreateOrConnectWithoutPresetInput[]
    createMany?: FavoriteCreateManyPresetInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type DonationUncheckedCreateNestedManyWithoutPresetInput = {
    create?: XOR<DonationCreateWithoutPresetInput, DonationUncheckedCreateWithoutPresetInput> | DonationCreateWithoutPresetInput[] | DonationUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutPresetInput | DonationCreateOrConnectWithoutPresetInput[]
    createMany?: DonationCreateManyPresetInputEnvelope
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutPresetsNestedInput = {
    create?: XOR<UserCreateWithoutPresetsInput, UserUncheckedCreateWithoutPresetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPresetsInput
    upsert?: UserUpsertWithoutPresetsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPresetsInput, UserUpdateWithoutPresetsInput>, UserUncheckedUpdateWithoutPresetsInput>
  }

  export type TagOnPresetUpdateManyWithoutPresetNestedInput = {
    create?: XOR<TagOnPresetCreateWithoutPresetInput, TagOnPresetUncheckedCreateWithoutPresetInput> | TagOnPresetCreateWithoutPresetInput[] | TagOnPresetUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: TagOnPresetCreateOrConnectWithoutPresetInput | TagOnPresetCreateOrConnectWithoutPresetInput[]
    upsert?: TagOnPresetUpsertWithWhereUniqueWithoutPresetInput | TagOnPresetUpsertWithWhereUniqueWithoutPresetInput[]
    createMany?: TagOnPresetCreateManyPresetInputEnvelope
    set?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    disconnect?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    delete?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    connect?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    update?: TagOnPresetUpdateWithWhereUniqueWithoutPresetInput | TagOnPresetUpdateWithWhereUniqueWithoutPresetInput[]
    updateMany?: TagOnPresetUpdateManyWithWhereWithoutPresetInput | TagOnPresetUpdateManyWithWhereWithoutPresetInput[]
    deleteMany?: TagOnPresetScalarWhereInput | TagOnPresetScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutPresetNestedInput = {
    create?: XOR<CommentCreateWithoutPresetInput, CommentUncheckedCreateWithoutPresetInput> | CommentCreateWithoutPresetInput[] | CommentUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPresetInput | CommentCreateOrConnectWithoutPresetInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPresetInput | CommentUpsertWithWhereUniqueWithoutPresetInput[]
    createMany?: CommentCreateManyPresetInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPresetInput | CommentUpdateWithWhereUniqueWithoutPresetInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPresetInput | CommentUpdateManyWithWhereWithoutPresetInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type DownloadHistoryUpdateManyWithoutPresetNestedInput = {
    create?: XOR<DownloadHistoryCreateWithoutPresetInput, DownloadHistoryUncheckedCreateWithoutPresetInput> | DownloadHistoryCreateWithoutPresetInput[] | DownloadHistoryUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: DownloadHistoryCreateOrConnectWithoutPresetInput | DownloadHistoryCreateOrConnectWithoutPresetInput[]
    upsert?: DownloadHistoryUpsertWithWhereUniqueWithoutPresetInput | DownloadHistoryUpsertWithWhereUniqueWithoutPresetInput[]
    createMany?: DownloadHistoryCreateManyPresetInputEnvelope
    set?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    disconnect?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    delete?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    connect?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    update?: DownloadHistoryUpdateWithWhereUniqueWithoutPresetInput | DownloadHistoryUpdateWithWhereUniqueWithoutPresetInput[]
    updateMany?: DownloadHistoryUpdateManyWithWhereWithoutPresetInput | DownloadHistoryUpdateManyWithWhereWithoutPresetInput[]
    deleteMany?: DownloadHistoryScalarWhereInput | DownloadHistoryScalarWhereInput[]
  }

  export type LikeUpdateManyWithoutPresetNestedInput = {
    create?: XOR<LikeCreateWithoutPresetInput, LikeUncheckedCreateWithoutPresetInput> | LikeCreateWithoutPresetInput[] | LikeUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutPresetInput | LikeCreateOrConnectWithoutPresetInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutPresetInput | LikeUpsertWithWhereUniqueWithoutPresetInput[]
    createMany?: LikeCreateManyPresetInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutPresetInput | LikeUpdateWithWhereUniqueWithoutPresetInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutPresetInput | LikeUpdateManyWithWhereWithoutPresetInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type FavoriteUpdateManyWithoutPresetNestedInput = {
    create?: XOR<FavoriteCreateWithoutPresetInput, FavoriteUncheckedCreateWithoutPresetInput> | FavoriteCreateWithoutPresetInput[] | FavoriteUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutPresetInput | FavoriteCreateOrConnectWithoutPresetInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutPresetInput | FavoriteUpsertWithWhereUniqueWithoutPresetInput[]
    createMany?: FavoriteCreateManyPresetInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutPresetInput | FavoriteUpdateWithWhereUniqueWithoutPresetInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutPresetInput | FavoriteUpdateManyWithWhereWithoutPresetInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type DonationUpdateManyWithoutPresetNestedInput = {
    create?: XOR<DonationCreateWithoutPresetInput, DonationUncheckedCreateWithoutPresetInput> | DonationCreateWithoutPresetInput[] | DonationUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutPresetInput | DonationCreateOrConnectWithoutPresetInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutPresetInput | DonationUpsertWithWhereUniqueWithoutPresetInput[]
    createMany?: DonationCreateManyPresetInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutPresetInput | DonationUpdateWithWhereUniqueWithoutPresetInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutPresetInput | DonationUpdateManyWithWhereWithoutPresetInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type TagOnPresetUncheckedUpdateManyWithoutPresetNestedInput = {
    create?: XOR<TagOnPresetCreateWithoutPresetInput, TagOnPresetUncheckedCreateWithoutPresetInput> | TagOnPresetCreateWithoutPresetInput[] | TagOnPresetUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: TagOnPresetCreateOrConnectWithoutPresetInput | TagOnPresetCreateOrConnectWithoutPresetInput[]
    upsert?: TagOnPresetUpsertWithWhereUniqueWithoutPresetInput | TagOnPresetUpsertWithWhereUniqueWithoutPresetInput[]
    createMany?: TagOnPresetCreateManyPresetInputEnvelope
    set?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    disconnect?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    delete?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    connect?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    update?: TagOnPresetUpdateWithWhereUniqueWithoutPresetInput | TagOnPresetUpdateWithWhereUniqueWithoutPresetInput[]
    updateMany?: TagOnPresetUpdateManyWithWhereWithoutPresetInput | TagOnPresetUpdateManyWithWhereWithoutPresetInput[]
    deleteMany?: TagOnPresetScalarWhereInput | TagOnPresetScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutPresetNestedInput = {
    create?: XOR<CommentCreateWithoutPresetInput, CommentUncheckedCreateWithoutPresetInput> | CommentCreateWithoutPresetInput[] | CommentUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPresetInput | CommentCreateOrConnectWithoutPresetInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPresetInput | CommentUpsertWithWhereUniqueWithoutPresetInput[]
    createMany?: CommentCreateManyPresetInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPresetInput | CommentUpdateWithWhereUniqueWithoutPresetInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPresetInput | CommentUpdateManyWithWhereWithoutPresetInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type DownloadHistoryUncheckedUpdateManyWithoutPresetNestedInput = {
    create?: XOR<DownloadHistoryCreateWithoutPresetInput, DownloadHistoryUncheckedCreateWithoutPresetInput> | DownloadHistoryCreateWithoutPresetInput[] | DownloadHistoryUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: DownloadHistoryCreateOrConnectWithoutPresetInput | DownloadHistoryCreateOrConnectWithoutPresetInput[]
    upsert?: DownloadHistoryUpsertWithWhereUniqueWithoutPresetInput | DownloadHistoryUpsertWithWhereUniqueWithoutPresetInput[]
    createMany?: DownloadHistoryCreateManyPresetInputEnvelope
    set?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    disconnect?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    delete?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    connect?: DownloadHistoryWhereUniqueInput | DownloadHistoryWhereUniqueInput[]
    update?: DownloadHistoryUpdateWithWhereUniqueWithoutPresetInput | DownloadHistoryUpdateWithWhereUniqueWithoutPresetInput[]
    updateMany?: DownloadHistoryUpdateManyWithWhereWithoutPresetInput | DownloadHistoryUpdateManyWithWhereWithoutPresetInput[]
    deleteMany?: DownloadHistoryScalarWhereInput | DownloadHistoryScalarWhereInput[]
  }

  export type LikeUncheckedUpdateManyWithoutPresetNestedInput = {
    create?: XOR<LikeCreateWithoutPresetInput, LikeUncheckedCreateWithoutPresetInput> | LikeCreateWithoutPresetInput[] | LikeUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutPresetInput | LikeCreateOrConnectWithoutPresetInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutPresetInput | LikeUpsertWithWhereUniqueWithoutPresetInput[]
    createMany?: LikeCreateManyPresetInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutPresetInput | LikeUpdateWithWhereUniqueWithoutPresetInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutPresetInput | LikeUpdateManyWithWhereWithoutPresetInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type FavoriteUncheckedUpdateManyWithoutPresetNestedInput = {
    create?: XOR<FavoriteCreateWithoutPresetInput, FavoriteUncheckedCreateWithoutPresetInput> | FavoriteCreateWithoutPresetInput[] | FavoriteUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutPresetInput | FavoriteCreateOrConnectWithoutPresetInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutPresetInput | FavoriteUpsertWithWhereUniqueWithoutPresetInput[]
    createMany?: FavoriteCreateManyPresetInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutPresetInput | FavoriteUpdateWithWhereUniqueWithoutPresetInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutPresetInput | FavoriteUpdateManyWithWhereWithoutPresetInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type DonationUncheckedUpdateManyWithoutPresetNestedInput = {
    create?: XOR<DonationCreateWithoutPresetInput, DonationUncheckedCreateWithoutPresetInput> | DonationCreateWithoutPresetInput[] | DonationUncheckedCreateWithoutPresetInput[]
    connectOrCreate?: DonationCreateOrConnectWithoutPresetInput | DonationCreateOrConnectWithoutPresetInput[]
    upsert?: DonationUpsertWithWhereUniqueWithoutPresetInput | DonationUpsertWithWhereUniqueWithoutPresetInput[]
    createMany?: DonationCreateManyPresetInputEnvelope
    set?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    disconnect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    delete?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    connect?: DonationWhereUniqueInput | DonationWhereUniqueInput[]
    update?: DonationUpdateWithWhereUniqueWithoutPresetInput | DonationUpdateWithWhereUniqueWithoutPresetInput[]
    updateMany?: DonationUpdateManyWithWhereWithoutPresetInput | DonationUpdateManyWithWhereWithoutPresetInput[]
    deleteMany?: DonationScalarWhereInput | DonationScalarWhereInput[]
  }

  export type TagOnPresetCreateNestedManyWithoutTagInput = {
    create?: XOR<TagOnPresetCreateWithoutTagInput, TagOnPresetUncheckedCreateWithoutTagInput> | TagOnPresetCreateWithoutTagInput[] | TagOnPresetUncheckedCreateWithoutTagInput[]
    connectOrCreate?: TagOnPresetCreateOrConnectWithoutTagInput | TagOnPresetCreateOrConnectWithoutTagInput[]
    createMany?: TagOnPresetCreateManyTagInputEnvelope
    connect?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
  }

  export type TagOnPresetUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<TagOnPresetCreateWithoutTagInput, TagOnPresetUncheckedCreateWithoutTagInput> | TagOnPresetCreateWithoutTagInput[] | TagOnPresetUncheckedCreateWithoutTagInput[]
    connectOrCreate?: TagOnPresetCreateOrConnectWithoutTagInput | TagOnPresetCreateOrConnectWithoutTagInput[]
    createMany?: TagOnPresetCreateManyTagInputEnvelope
    connect?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
  }

  export type TagOnPresetUpdateManyWithoutTagNestedInput = {
    create?: XOR<TagOnPresetCreateWithoutTagInput, TagOnPresetUncheckedCreateWithoutTagInput> | TagOnPresetCreateWithoutTagInput[] | TagOnPresetUncheckedCreateWithoutTagInput[]
    connectOrCreate?: TagOnPresetCreateOrConnectWithoutTagInput | TagOnPresetCreateOrConnectWithoutTagInput[]
    upsert?: TagOnPresetUpsertWithWhereUniqueWithoutTagInput | TagOnPresetUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: TagOnPresetCreateManyTagInputEnvelope
    set?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    disconnect?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    delete?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    connect?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    update?: TagOnPresetUpdateWithWhereUniqueWithoutTagInput | TagOnPresetUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: TagOnPresetUpdateManyWithWhereWithoutTagInput | TagOnPresetUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: TagOnPresetScalarWhereInput | TagOnPresetScalarWhereInput[]
  }

  export type TagOnPresetUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<TagOnPresetCreateWithoutTagInput, TagOnPresetUncheckedCreateWithoutTagInput> | TagOnPresetCreateWithoutTagInput[] | TagOnPresetUncheckedCreateWithoutTagInput[]
    connectOrCreate?: TagOnPresetCreateOrConnectWithoutTagInput | TagOnPresetCreateOrConnectWithoutTagInput[]
    upsert?: TagOnPresetUpsertWithWhereUniqueWithoutTagInput | TagOnPresetUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: TagOnPresetCreateManyTagInputEnvelope
    set?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    disconnect?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    delete?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    connect?: TagOnPresetWhereUniqueInput | TagOnPresetWhereUniqueInput[]
    update?: TagOnPresetUpdateWithWhereUniqueWithoutTagInput | TagOnPresetUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: TagOnPresetUpdateManyWithWhereWithoutTagInput | TagOnPresetUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: TagOnPresetScalarWhereInput | TagOnPresetScalarWhereInput[]
  }

  export type PresetCreateNestedOneWithoutTagsInput = {
    create?: XOR<PresetCreateWithoutTagsInput, PresetUncheckedCreateWithoutTagsInput>
    connectOrCreate?: PresetCreateOrConnectWithoutTagsInput
    connect?: PresetWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutPresetsInput = {
    create?: XOR<TagCreateWithoutPresetsInput, TagUncheckedCreateWithoutPresetsInput>
    connectOrCreate?: TagCreateOrConnectWithoutPresetsInput
    connect?: TagWhereUniqueInput
  }

  export type PresetUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<PresetCreateWithoutTagsInput, PresetUncheckedCreateWithoutTagsInput>
    connectOrCreate?: PresetCreateOrConnectWithoutTagsInput
    upsert?: PresetUpsertWithoutTagsInput
    connect?: PresetWhereUniqueInput
    update?: XOR<XOR<PresetUpdateToOneWithWhereWithoutTagsInput, PresetUpdateWithoutTagsInput>, PresetUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutPresetsNestedInput = {
    create?: XOR<TagCreateWithoutPresetsInput, TagUncheckedCreateWithoutPresetsInput>
    connectOrCreate?: TagCreateOrConnectWithoutPresetsInput
    upsert?: TagUpsertWithoutPresetsInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutPresetsInput, TagUpdateWithoutPresetsInput>, TagUncheckedUpdateWithoutPresetsInput>
  }

  export type UserCreateNestedOneWithoutDownloadsInput = {
    create?: XOR<UserCreateWithoutDownloadsInput, UserUncheckedCreateWithoutDownloadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDownloadsInput
    connect?: UserWhereUniqueInput
  }

  export type PresetCreateNestedOneWithoutDownloadsLogInput = {
    create?: XOR<PresetCreateWithoutDownloadsLogInput, PresetUncheckedCreateWithoutDownloadsLogInput>
    connectOrCreate?: PresetCreateOrConnectWithoutDownloadsLogInput
    connect?: PresetWhereUniqueInput
  }

  export type UserUpdateOneWithoutDownloadsNestedInput = {
    create?: XOR<UserCreateWithoutDownloadsInput, UserUncheckedCreateWithoutDownloadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDownloadsInput
    upsert?: UserUpsertWithoutDownloadsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDownloadsInput, UserUpdateWithoutDownloadsInput>, UserUncheckedUpdateWithoutDownloadsInput>
  }

  export type PresetUpdateOneRequiredWithoutDownloadsLogNestedInput = {
    create?: XOR<PresetCreateWithoutDownloadsLogInput, PresetUncheckedCreateWithoutDownloadsLogInput>
    connectOrCreate?: PresetCreateOrConnectWithoutDownloadsLogInput
    upsert?: PresetUpsertWithoutDownloadsLogInput
    connect?: PresetWhereUniqueInput
    update?: XOR<XOR<PresetUpdateToOneWithWhereWithoutDownloadsLogInput, PresetUpdateWithoutDownloadsLogInput>, PresetUncheckedUpdateWithoutDownloadsLogInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutLikesInput = {
    create?: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikesInput
    connect?: UserWhereUniqueInput
  }

  export type PresetCreateNestedOneWithoutLikesInput = {
    create?: XOR<PresetCreateWithoutLikesInput, PresetUncheckedCreateWithoutLikesInput>
    connectOrCreate?: PresetCreateOrConnectWithoutLikesInput
    connect?: PresetWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikesInput
    upsert?: UserUpsertWithoutLikesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLikesInput, UserUpdateWithoutLikesInput>, UserUncheckedUpdateWithoutLikesInput>
  }

  export type PresetUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<PresetCreateWithoutLikesInput, PresetUncheckedCreateWithoutLikesInput>
    connectOrCreate?: PresetCreateOrConnectWithoutLikesInput
    upsert?: PresetUpsertWithoutLikesInput
    connect?: PresetWhereUniqueInput
    update?: XOR<XOR<PresetUpdateToOneWithWhereWithoutLikesInput, PresetUpdateWithoutLikesInput>, PresetUncheckedUpdateWithoutLikesInput>
  }

  export type UserCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    connect?: UserWhereUniqueInput
  }

  export type PresetCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<PresetCreateWithoutFavoritesInput, PresetUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: PresetCreateOrConnectWithoutFavoritesInput
    connect?: PresetWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    upsert?: UserUpsertWithoutFavoritesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFavoritesInput, UserUpdateWithoutFavoritesInput>, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type PresetUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<PresetCreateWithoutFavoritesInput, PresetUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: PresetCreateOrConnectWithoutFavoritesInput
    upsert?: PresetUpsertWithoutFavoritesInput
    connect?: PresetWhereUniqueInput
    update?: XOR<XOR<PresetUpdateToOneWithWhereWithoutFavoritesInput, PresetUpdateWithoutFavoritesInput>, PresetUncheckedUpdateWithoutFavoritesInput>
  }

  export type PresetCreateNestedOneWithoutCommentsInput = {
    create?: XOR<PresetCreateWithoutCommentsInput, PresetUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PresetCreateOrConnectWithoutCommentsInput
    connect?: PresetWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type PresetUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<PresetCreateWithoutCommentsInput, PresetUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PresetCreateOrConnectWithoutCommentsInput
    upsert?: PresetUpsertWithoutCommentsInput
    connect?: PresetWhereUniqueInput
    update?: XOR<XOR<PresetUpdateToOneWithWhereWithoutCommentsInput, PresetUpdateWithoutCommentsInput>, PresetUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserCreateNestedOneWithoutDonationsInput = {
    create?: XOR<UserCreateWithoutDonationsInput, UserUncheckedCreateWithoutDonationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDonationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedDonationsInput = {
    create?: XOR<UserCreateWithoutReceivedDonationsInput, UserUncheckedCreateWithoutReceivedDonationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedDonationsInput
    connect?: UserWhereUniqueInput
  }

  export type PresetCreateNestedOneWithoutDonationsInput = {
    create?: XOR<PresetCreateWithoutDonationsInput, PresetUncheckedCreateWithoutDonationsInput>
    connectOrCreate?: PresetCreateOrConnectWithoutDonationsInput
    connect?: PresetWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutDonationsNestedInput = {
    create?: XOR<UserCreateWithoutDonationsInput, UserUncheckedCreateWithoutDonationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDonationsInput
    upsert?: UserUpsertWithoutDonationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDonationsInput, UserUpdateWithoutDonationsInput>, UserUncheckedUpdateWithoutDonationsInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedDonationsNestedInput = {
    create?: XOR<UserCreateWithoutReceivedDonationsInput, UserUncheckedCreateWithoutReceivedDonationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedDonationsInput
    upsert?: UserUpsertWithoutReceivedDonationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedDonationsInput, UserUpdateWithoutReceivedDonationsInput>, UserUncheckedUpdateWithoutReceivedDonationsInput>
  }

  export type PresetUpdateOneWithoutDonationsNestedInput = {
    create?: XOR<PresetCreateWithoutDonationsInput, PresetUncheckedCreateWithoutDonationsInput>
    connectOrCreate?: PresetCreateOrConnectWithoutDonationsInput
    upsert?: PresetUpsertWithoutDonationsInput
    disconnect?: PresetWhereInput | boolean
    delete?: PresetWhereInput | boolean
    connect?: PresetWhereUniqueInput
    update?: XOR<XOR<PresetUpdateToOneWithWhereWithoutDonationsInput, PresetUpdateWithoutDonationsInput>, PresetUncheckedUpdateWithoutDonationsInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type PresetCreateWithoutUserInput = {
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagOnPresetCreateNestedManyWithoutPresetInput
    comments?: CommentCreateNestedManyWithoutPresetInput
    downloadsLog?: DownloadHistoryCreateNestedManyWithoutPresetInput
    likes?: LikeCreateNestedManyWithoutPresetInput
    favorites?: FavoriteCreateNestedManyWithoutPresetInput
    donations?: DonationCreateNestedManyWithoutPresetInput
  }

  export type PresetUncheckedCreateWithoutUserInput = {
    id?: number
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagOnPresetUncheckedCreateNestedManyWithoutPresetInput
    comments?: CommentUncheckedCreateNestedManyWithoutPresetInput
    downloadsLog?: DownloadHistoryUncheckedCreateNestedManyWithoutPresetInput
    likes?: LikeUncheckedCreateNestedManyWithoutPresetInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutPresetInput
    donations?: DonationUncheckedCreateNestedManyWithoutPresetInput
  }

  export type PresetCreateOrConnectWithoutUserInput = {
    where: PresetWhereUniqueInput
    create: XOR<PresetCreateWithoutUserInput, PresetUncheckedCreateWithoutUserInput>
  }

  export type PresetCreateManyUserInputEnvelope = {
    data: PresetCreateManyUserInput | PresetCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutUserInput = {
    content: string
    parentId?: number | null
    createdAt?: Date | string
    preset: PresetCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutUserInput = {
    id?: number
    content: string
    presetId: number
    parentId?: number | null
    createdAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutUserInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentCreateManyUserInputEnvelope = {
    data: CommentCreateManyUserInput | CommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DownloadHistoryCreateWithoutUserInput = {
    ipAddress?: string | null
    createdAt?: Date | string
    preset: PresetCreateNestedOneWithoutDownloadsLogInput
  }

  export type DownloadHistoryUncheckedCreateWithoutUserInput = {
    id?: number
    presetId: number
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type DownloadHistoryCreateOrConnectWithoutUserInput = {
    where: DownloadHistoryWhereUniqueInput
    create: XOR<DownloadHistoryCreateWithoutUserInput, DownloadHistoryUncheckedCreateWithoutUserInput>
  }

  export type DownloadHistoryCreateManyUserInputEnvelope = {
    data: DownloadHistoryCreateManyUserInput | DownloadHistoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LikeCreateWithoutUserInput = {
    createdAt?: Date | string
    preset: PresetCreateNestedOneWithoutLikesInput
  }

  export type LikeUncheckedCreateWithoutUserInput = {
    id?: number
    presetId: number
    createdAt?: Date | string
  }

  export type LikeCreateOrConnectWithoutUserInput = {
    where: LikeWhereUniqueInput
    create: XOR<LikeCreateWithoutUserInput, LikeUncheckedCreateWithoutUserInput>
  }

  export type LikeCreateManyUserInputEnvelope = {
    data: LikeCreateManyUserInput | LikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FavoriteCreateWithoutUserInput = {
    createdAt?: Date | string
    preset: PresetCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateWithoutUserInput = {
    id?: number
    presetId: number
    createdAt?: Date | string
  }

  export type FavoriteCreateOrConnectWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteCreateManyUserInputEnvelope = {
    data: FavoriteCreateManyUserInput | FavoriteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DonationCreateWithoutDonorInput = {
    amount: number
    currency?: string
    message?: string | null
    createdAt?: Date | string
    creator: UserCreateNestedOneWithoutReceivedDonationsInput
    preset?: PresetCreateNestedOneWithoutDonationsInput
  }

  export type DonationUncheckedCreateWithoutDonorInput = {
    id?: number
    amount: number
    currency?: string
    creatorId: number
    presetId?: number | null
    message?: string | null
    createdAt?: Date | string
  }

  export type DonationCreateOrConnectWithoutDonorInput = {
    where: DonationWhereUniqueInput
    create: XOR<DonationCreateWithoutDonorInput, DonationUncheckedCreateWithoutDonorInput>
  }

  export type DonationCreateManyDonorInputEnvelope = {
    data: DonationCreateManyDonorInput | DonationCreateManyDonorInput[]
    skipDuplicates?: boolean
  }

  export type DonationCreateWithoutCreatorInput = {
    amount: number
    currency?: string
    message?: string | null
    createdAt?: Date | string
    donor: UserCreateNestedOneWithoutDonationsInput
    preset?: PresetCreateNestedOneWithoutDonationsInput
  }

  export type DonationUncheckedCreateWithoutCreatorInput = {
    id?: number
    amount: number
    currency?: string
    donorId: number
    presetId?: number | null
    message?: string | null
    createdAt?: Date | string
  }

  export type DonationCreateOrConnectWithoutCreatorInput = {
    where: DonationWhereUniqueInput
    create: XOR<DonationCreateWithoutCreatorInput, DonationUncheckedCreateWithoutCreatorInput>
  }

  export type DonationCreateManyCreatorInputEnvelope = {
    data: DonationCreateManyCreatorInput | DonationCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    title: string
    content: string
    link?: string | null
    read?: boolean
    type: string
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: number
    title: string
    content: string
    link?: string | null
    read?: boolean
    type: string
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PresetUpsertWithWhereUniqueWithoutUserInput = {
    where: PresetWhereUniqueInput
    update: XOR<PresetUpdateWithoutUserInput, PresetUncheckedUpdateWithoutUserInput>
    create: XOR<PresetCreateWithoutUserInput, PresetUncheckedCreateWithoutUserInput>
  }

  export type PresetUpdateWithWhereUniqueWithoutUserInput = {
    where: PresetWhereUniqueInput
    data: XOR<PresetUpdateWithoutUserInput, PresetUncheckedUpdateWithoutUserInput>
  }

  export type PresetUpdateManyWithWhereWithoutUserInput = {
    where: PresetScalarWhereInput
    data: XOR<PresetUpdateManyMutationInput, PresetUncheckedUpdateManyWithoutUserInput>
  }

  export type PresetScalarWhereInput = {
    AND?: PresetScalarWhereInput | PresetScalarWhereInput[]
    OR?: PresetScalarWhereInput[]
    NOT?: PresetScalarWhereInput | PresetScalarWhereInput[]
    id?: IntFilter<"Preset"> | number
    title?: StringFilter<"Preset"> | string
    description?: StringNullableFilter<"Preset"> | string | null
    daw?: StringFilter<"Preset"> | string
    format?: StringFilter<"Preset"> | string
    filePath?: StringFilter<"Preset"> | string
    fileSize?: IntFilter<"Preset"> | number
    files?: JsonNullableFilter<"Preset">
    coverImage?: StringNullableFilter<"Preset"> | string | null
    downloads?: IntFilter<"Preset"> | number
    likesCount?: IntFilter<"Preset"> | number
    favoritesCount?: IntFilter<"Preset"> | number
    isPublic?: BoolFilter<"Preset"> | boolean
    previewAudio?: StringNullableFilter<"Preset"> | string | null
    deletedAt?: DateTimeNullableFilter<"Preset"> | Date | string | null
    createdAt?: DateTimeFilter<"Preset"> | Date | string
    updatedAt?: DateTimeFilter<"Preset"> | Date | string
    userId?: IntFilter<"Preset"> | number
  }

  export type CommentUpsertWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
  }

  export type CommentUpdateManyWithWhereWithoutUserInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutUserInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: IntFilter<"Comment"> | number
    content?: StringFilter<"Comment"> | string
    presetId?: IntFilter<"Comment"> | number
    userId?: IntFilter<"Comment"> | number
    parentId?: IntNullableFilter<"Comment"> | number | null
    createdAt?: DateTimeFilter<"Comment"> | Date | string
  }

  export type DownloadHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: DownloadHistoryWhereUniqueInput
    update: XOR<DownloadHistoryUpdateWithoutUserInput, DownloadHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<DownloadHistoryCreateWithoutUserInput, DownloadHistoryUncheckedCreateWithoutUserInput>
  }

  export type DownloadHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: DownloadHistoryWhereUniqueInput
    data: XOR<DownloadHistoryUpdateWithoutUserInput, DownloadHistoryUncheckedUpdateWithoutUserInput>
  }

  export type DownloadHistoryUpdateManyWithWhereWithoutUserInput = {
    where: DownloadHistoryScalarWhereInput
    data: XOR<DownloadHistoryUpdateManyMutationInput, DownloadHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type DownloadHistoryScalarWhereInput = {
    AND?: DownloadHistoryScalarWhereInput | DownloadHistoryScalarWhereInput[]
    OR?: DownloadHistoryScalarWhereInput[]
    NOT?: DownloadHistoryScalarWhereInput | DownloadHistoryScalarWhereInput[]
    id?: IntFilter<"DownloadHistory"> | number
    userId?: IntNullableFilter<"DownloadHistory"> | number | null
    presetId?: IntFilter<"DownloadHistory"> | number
    ipAddress?: StringNullableFilter<"DownloadHistory"> | string | null
    createdAt?: DateTimeFilter<"DownloadHistory"> | Date | string
  }

  export type LikeUpsertWithWhereUniqueWithoutUserInput = {
    where: LikeWhereUniqueInput
    update: XOR<LikeUpdateWithoutUserInput, LikeUncheckedUpdateWithoutUserInput>
    create: XOR<LikeCreateWithoutUserInput, LikeUncheckedCreateWithoutUserInput>
  }

  export type LikeUpdateWithWhereUniqueWithoutUserInput = {
    where: LikeWhereUniqueInput
    data: XOR<LikeUpdateWithoutUserInput, LikeUncheckedUpdateWithoutUserInput>
  }

  export type LikeUpdateManyWithWhereWithoutUserInput = {
    where: LikeScalarWhereInput
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyWithoutUserInput>
  }

  export type LikeScalarWhereInput = {
    AND?: LikeScalarWhereInput | LikeScalarWhereInput[]
    OR?: LikeScalarWhereInput[]
    NOT?: LikeScalarWhereInput | LikeScalarWhereInput[]
    id?: IntFilter<"Like"> | number
    userId?: IntFilter<"Like"> | number
    presetId?: IntFilter<"Like"> | number
    createdAt?: DateTimeFilter<"Like"> | Date | string
  }

  export type FavoriteUpsertWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutUserInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutUserInput>
  }

  export type FavoriteScalarWhereInput = {
    AND?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
    OR?: FavoriteScalarWhereInput[]
    NOT?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
    id?: IntFilter<"Favorite"> | number
    userId?: IntFilter<"Favorite"> | number
    presetId?: IntFilter<"Favorite"> | number
    createdAt?: DateTimeFilter<"Favorite"> | Date | string
  }

  export type DonationUpsertWithWhereUniqueWithoutDonorInput = {
    where: DonationWhereUniqueInput
    update: XOR<DonationUpdateWithoutDonorInput, DonationUncheckedUpdateWithoutDonorInput>
    create: XOR<DonationCreateWithoutDonorInput, DonationUncheckedCreateWithoutDonorInput>
  }

  export type DonationUpdateWithWhereUniqueWithoutDonorInput = {
    where: DonationWhereUniqueInput
    data: XOR<DonationUpdateWithoutDonorInput, DonationUncheckedUpdateWithoutDonorInput>
  }

  export type DonationUpdateManyWithWhereWithoutDonorInput = {
    where: DonationScalarWhereInput
    data: XOR<DonationUpdateManyMutationInput, DonationUncheckedUpdateManyWithoutDonorInput>
  }

  export type DonationScalarWhereInput = {
    AND?: DonationScalarWhereInput | DonationScalarWhereInput[]
    OR?: DonationScalarWhereInput[]
    NOT?: DonationScalarWhereInput | DonationScalarWhereInput[]
    id?: IntFilter<"Donation"> | number
    amount?: IntFilter<"Donation"> | number
    currency?: StringFilter<"Donation"> | string
    donorId?: IntFilter<"Donation"> | number
    creatorId?: IntFilter<"Donation"> | number
    presetId?: IntNullableFilter<"Donation"> | number | null
    message?: StringNullableFilter<"Donation"> | string | null
    createdAt?: DateTimeFilter<"Donation"> | Date | string
  }

  export type DonationUpsertWithWhereUniqueWithoutCreatorInput = {
    where: DonationWhereUniqueInput
    update: XOR<DonationUpdateWithoutCreatorInput, DonationUncheckedUpdateWithoutCreatorInput>
    create: XOR<DonationCreateWithoutCreatorInput, DonationUncheckedCreateWithoutCreatorInput>
  }

  export type DonationUpdateWithWhereUniqueWithoutCreatorInput = {
    where: DonationWhereUniqueInput
    data: XOR<DonationUpdateWithoutCreatorInput, DonationUncheckedUpdateWithoutCreatorInput>
  }

  export type DonationUpdateManyWithWhereWithoutCreatorInput = {
    where: DonationScalarWhereInput
    data: XOR<DonationUpdateManyMutationInput, DonationUncheckedUpdateManyWithoutCreatorInput>
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: IntFilter<"Notification"> | number
    title?: StringFilter<"Notification"> | string
    content?: StringFilter<"Notification"> | string
    link?: StringNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    type?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type UserCreateWithoutPresetsInput = {
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryCreateNestedManyWithoutUserInput
    likes?: LikeCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    donations?: DonationCreateNestedManyWithoutDonorInput
    receivedDonations?: DonationCreateNestedManyWithoutCreatorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPresetsInput = {
    id?: number
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryUncheckedCreateNestedManyWithoutUserInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    donations?: DonationUncheckedCreateNestedManyWithoutDonorInput
    receivedDonations?: DonationUncheckedCreateNestedManyWithoutCreatorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPresetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPresetsInput, UserUncheckedCreateWithoutPresetsInput>
  }

  export type TagOnPresetCreateWithoutPresetInput = {
    tag: TagCreateNestedOneWithoutPresetsInput
  }

  export type TagOnPresetUncheckedCreateWithoutPresetInput = {
    tagId: number
  }

  export type TagOnPresetCreateOrConnectWithoutPresetInput = {
    where: TagOnPresetWhereUniqueInput
    create: XOR<TagOnPresetCreateWithoutPresetInput, TagOnPresetUncheckedCreateWithoutPresetInput>
  }

  export type TagOnPresetCreateManyPresetInputEnvelope = {
    data: TagOnPresetCreateManyPresetInput | TagOnPresetCreateManyPresetInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutPresetInput = {
    content: string
    parentId?: number | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutPresetInput = {
    id?: number
    content: string
    userId: number
    parentId?: number | null
    createdAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutPresetInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutPresetInput, CommentUncheckedCreateWithoutPresetInput>
  }

  export type CommentCreateManyPresetInputEnvelope = {
    data: CommentCreateManyPresetInput | CommentCreateManyPresetInput[]
    skipDuplicates?: boolean
  }

  export type DownloadHistoryCreateWithoutPresetInput = {
    ipAddress?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutDownloadsInput
  }

  export type DownloadHistoryUncheckedCreateWithoutPresetInput = {
    id?: number
    userId?: number | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type DownloadHistoryCreateOrConnectWithoutPresetInput = {
    where: DownloadHistoryWhereUniqueInput
    create: XOR<DownloadHistoryCreateWithoutPresetInput, DownloadHistoryUncheckedCreateWithoutPresetInput>
  }

  export type DownloadHistoryCreateManyPresetInputEnvelope = {
    data: DownloadHistoryCreateManyPresetInput | DownloadHistoryCreateManyPresetInput[]
    skipDuplicates?: boolean
  }

  export type LikeCreateWithoutPresetInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLikesInput
  }

  export type LikeUncheckedCreateWithoutPresetInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type LikeCreateOrConnectWithoutPresetInput = {
    where: LikeWhereUniqueInput
    create: XOR<LikeCreateWithoutPresetInput, LikeUncheckedCreateWithoutPresetInput>
  }

  export type LikeCreateManyPresetInputEnvelope = {
    data: LikeCreateManyPresetInput | LikeCreateManyPresetInput[]
    skipDuplicates?: boolean
  }

  export type FavoriteCreateWithoutPresetInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateWithoutPresetInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type FavoriteCreateOrConnectWithoutPresetInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutPresetInput, FavoriteUncheckedCreateWithoutPresetInput>
  }

  export type FavoriteCreateManyPresetInputEnvelope = {
    data: FavoriteCreateManyPresetInput | FavoriteCreateManyPresetInput[]
    skipDuplicates?: boolean
  }

  export type DonationCreateWithoutPresetInput = {
    amount: number
    currency?: string
    message?: string | null
    createdAt?: Date | string
    donor: UserCreateNestedOneWithoutDonationsInput
    creator: UserCreateNestedOneWithoutReceivedDonationsInput
  }

  export type DonationUncheckedCreateWithoutPresetInput = {
    id?: number
    amount: number
    currency?: string
    donorId: number
    creatorId: number
    message?: string | null
    createdAt?: Date | string
  }

  export type DonationCreateOrConnectWithoutPresetInput = {
    where: DonationWhereUniqueInput
    create: XOR<DonationCreateWithoutPresetInput, DonationUncheckedCreateWithoutPresetInput>
  }

  export type DonationCreateManyPresetInputEnvelope = {
    data: DonationCreateManyPresetInput | DonationCreateManyPresetInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPresetsInput = {
    update: XOR<UserUpdateWithoutPresetsInput, UserUncheckedUpdateWithoutPresetsInput>
    create: XOR<UserCreateWithoutPresetsInput, UserUncheckedCreateWithoutPresetsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPresetsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPresetsInput, UserUncheckedUpdateWithoutPresetsInput>
  }

  export type UserUpdateWithoutPresetsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUpdateManyWithoutUserNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    donations?: DonationUpdateManyWithoutDonorNestedInput
    receivedDonations?: DonationUpdateManyWithoutCreatorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPresetsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUncheckedUpdateManyWithoutUserNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    donations?: DonationUncheckedUpdateManyWithoutDonorNestedInput
    receivedDonations?: DonationUncheckedUpdateManyWithoutCreatorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TagOnPresetUpsertWithWhereUniqueWithoutPresetInput = {
    where: TagOnPresetWhereUniqueInput
    update: XOR<TagOnPresetUpdateWithoutPresetInput, TagOnPresetUncheckedUpdateWithoutPresetInput>
    create: XOR<TagOnPresetCreateWithoutPresetInput, TagOnPresetUncheckedCreateWithoutPresetInput>
  }

  export type TagOnPresetUpdateWithWhereUniqueWithoutPresetInput = {
    where: TagOnPresetWhereUniqueInput
    data: XOR<TagOnPresetUpdateWithoutPresetInput, TagOnPresetUncheckedUpdateWithoutPresetInput>
  }

  export type TagOnPresetUpdateManyWithWhereWithoutPresetInput = {
    where: TagOnPresetScalarWhereInput
    data: XOR<TagOnPresetUpdateManyMutationInput, TagOnPresetUncheckedUpdateManyWithoutPresetInput>
  }

  export type TagOnPresetScalarWhereInput = {
    AND?: TagOnPresetScalarWhereInput | TagOnPresetScalarWhereInput[]
    OR?: TagOnPresetScalarWhereInput[]
    NOT?: TagOnPresetScalarWhereInput | TagOnPresetScalarWhereInput[]
    presetId?: IntFilter<"TagOnPreset"> | number
    tagId?: IntFilter<"TagOnPreset"> | number
  }

  export type CommentUpsertWithWhereUniqueWithoutPresetInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutPresetInput, CommentUncheckedUpdateWithoutPresetInput>
    create: XOR<CommentCreateWithoutPresetInput, CommentUncheckedCreateWithoutPresetInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutPresetInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutPresetInput, CommentUncheckedUpdateWithoutPresetInput>
  }

  export type CommentUpdateManyWithWhereWithoutPresetInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutPresetInput>
  }

  export type DownloadHistoryUpsertWithWhereUniqueWithoutPresetInput = {
    where: DownloadHistoryWhereUniqueInput
    update: XOR<DownloadHistoryUpdateWithoutPresetInput, DownloadHistoryUncheckedUpdateWithoutPresetInput>
    create: XOR<DownloadHistoryCreateWithoutPresetInput, DownloadHistoryUncheckedCreateWithoutPresetInput>
  }

  export type DownloadHistoryUpdateWithWhereUniqueWithoutPresetInput = {
    where: DownloadHistoryWhereUniqueInput
    data: XOR<DownloadHistoryUpdateWithoutPresetInput, DownloadHistoryUncheckedUpdateWithoutPresetInput>
  }

  export type DownloadHistoryUpdateManyWithWhereWithoutPresetInput = {
    where: DownloadHistoryScalarWhereInput
    data: XOR<DownloadHistoryUpdateManyMutationInput, DownloadHistoryUncheckedUpdateManyWithoutPresetInput>
  }

  export type LikeUpsertWithWhereUniqueWithoutPresetInput = {
    where: LikeWhereUniqueInput
    update: XOR<LikeUpdateWithoutPresetInput, LikeUncheckedUpdateWithoutPresetInput>
    create: XOR<LikeCreateWithoutPresetInput, LikeUncheckedCreateWithoutPresetInput>
  }

  export type LikeUpdateWithWhereUniqueWithoutPresetInput = {
    where: LikeWhereUniqueInput
    data: XOR<LikeUpdateWithoutPresetInput, LikeUncheckedUpdateWithoutPresetInput>
  }

  export type LikeUpdateManyWithWhereWithoutPresetInput = {
    where: LikeScalarWhereInput
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyWithoutPresetInput>
  }

  export type FavoriteUpsertWithWhereUniqueWithoutPresetInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutPresetInput, FavoriteUncheckedUpdateWithoutPresetInput>
    create: XOR<FavoriteCreateWithoutPresetInput, FavoriteUncheckedCreateWithoutPresetInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutPresetInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutPresetInput, FavoriteUncheckedUpdateWithoutPresetInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutPresetInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutPresetInput>
  }

  export type DonationUpsertWithWhereUniqueWithoutPresetInput = {
    where: DonationWhereUniqueInput
    update: XOR<DonationUpdateWithoutPresetInput, DonationUncheckedUpdateWithoutPresetInput>
    create: XOR<DonationCreateWithoutPresetInput, DonationUncheckedCreateWithoutPresetInput>
  }

  export type DonationUpdateWithWhereUniqueWithoutPresetInput = {
    where: DonationWhereUniqueInput
    data: XOR<DonationUpdateWithoutPresetInput, DonationUncheckedUpdateWithoutPresetInput>
  }

  export type DonationUpdateManyWithWhereWithoutPresetInput = {
    where: DonationScalarWhereInput
    data: XOR<DonationUpdateManyMutationInput, DonationUncheckedUpdateManyWithoutPresetInput>
  }

  export type TagOnPresetCreateWithoutTagInput = {
    preset: PresetCreateNestedOneWithoutTagsInput
  }

  export type TagOnPresetUncheckedCreateWithoutTagInput = {
    presetId: number
  }

  export type TagOnPresetCreateOrConnectWithoutTagInput = {
    where: TagOnPresetWhereUniqueInput
    create: XOR<TagOnPresetCreateWithoutTagInput, TagOnPresetUncheckedCreateWithoutTagInput>
  }

  export type TagOnPresetCreateManyTagInputEnvelope = {
    data: TagOnPresetCreateManyTagInput | TagOnPresetCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type TagOnPresetUpsertWithWhereUniqueWithoutTagInput = {
    where: TagOnPresetWhereUniqueInput
    update: XOR<TagOnPresetUpdateWithoutTagInput, TagOnPresetUncheckedUpdateWithoutTagInput>
    create: XOR<TagOnPresetCreateWithoutTagInput, TagOnPresetUncheckedCreateWithoutTagInput>
  }

  export type TagOnPresetUpdateWithWhereUniqueWithoutTagInput = {
    where: TagOnPresetWhereUniqueInput
    data: XOR<TagOnPresetUpdateWithoutTagInput, TagOnPresetUncheckedUpdateWithoutTagInput>
  }

  export type TagOnPresetUpdateManyWithWhereWithoutTagInput = {
    where: TagOnPresetScalarWhereInput
    data: XOR<TagOnPresetUpdateManyMutationInput, TagOnPresetUncheckedUpdateManyWithoutTagInput>
  }

  export type PresetCreateWithoutTagsInput = {
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPresetsInput
    comments?: CommentCreateNestedManyWithoutPresetInput
    downloadsLog?: DownloadHistoryCreateNestedManyWithoutPresetInput
    likes?: LikeCreateNestedManyWithoutPresetInput
    favorites?: FavoriteCreateNestedManyWithoutPresetInput
    donations?: DonationCreateNestedManyWithoutPresetInput
  }

  export type PresetUncheckedCreateWithoutTagsInput = {
    id?: number
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    comments?: CommentUncheckedCreateNestedManyWithoutPresetInput
    downloadsLog?: DownloadHistoryUncheckedCreateNestedManyWithoutPresetInput
    likes?: LikeUncheckedCreateNestedManyWithoutPresetInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutPresetInput
    donations?: DonationUncheckedCreateNestedManyWithoutPresetInput
  }

  export type PresetCreateOrConnectWithoutTagsInput = {
    where: PresetWhereUniqueInput
    create: XOR<PresetCreateWithoutTagsInput, PresetUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutPresetsInput = {
    name: string
  }

  export type TagUncheckedCreateWithoutPresetsInput = {
    id?: number
    name: string
  }

  export type TagCreateOrConnectWithoutPresetsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutPresetsInput, TagUncheckedCreateWithoutPresetsInput>
  }

  export type PresetUpsertWithoutTagsInput = {
    update: XOR<PresetUpdateWithoutTagsInput, PresetUncheckedUpdateWithoutTagsInput>
    create: XOR<PresetCreateWithoutTagsInput, PresetUncheckedCreateWithoutTagsInput>
    where?: PresetWhereInput
  }

  export type PresetUpdateToOneWithWhereWithoutTagsInput = {
    where?: PresetWhereInput
    data: XOR<PresetUpdateWithoutTagsInput, PresetUncheckedUpdateWithoutTagsInput>
  }

  export type PresetUpdateWithoutTagsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPresetsNestedInput
    comments?: CommentUpdateManyWithoutPresetNestedInput
    downloadsLog?: DownloadHistoryUpdateManyWithoutPresetNestedInput
    likes?: LikeUpdateManyWithoutPresetNestedInput
    favorites?: FavoriteUpdateManyWithoutPresetNestedInput
    donations?: DonationUpdateManyWithoutPresetNestedInput
  }

  export type PresetUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    comments?: CommentUncheckedUpdateManyWithoutPresetNestedInput
    downloadsLog?: DownloadHistoryUncheckedUpdateManyWithoutPresetNestedInput
    likes?: LikeUncheckedUpdateManyWithoutPresetNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutPresetNestedInput
    donations?: DonationUncheckedUpdateManyWithoutPresetNestedInput
  }

  export type TagUpsertWithoutPresetsInput = {
    update: XOR<TagUpdateWithoutPresetsInput, TagUncheckedUpdateWithoutPresetsInput>
    create: XOR<TagCreateWithoutPresetsInput, TagUncheckedCreateWithoutPresetsInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutPresetsInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutPresetsInput, TagUncheckedUpdateWithoutPresetsInput>
  }

  export type TagUpdateWithoutPresetsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateWithoutPresetsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutDownloadsInput = {
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    likes?: LikeCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    donations?: DonationCreateNestedManyWithoutDonorInput
    receivedDonations?: DonationCreateNestedManyWithoutCreatorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDownloadsInput = {
    id?: number
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    donations?: DonationUncheckedCreateNestedManyWithoutDonorInput
    receivedDonations?: DonationUncheckedCreateNestedManyWithoutCreatorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDownloadsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDownloadsInput, UserUncheckedCreateWithoutDownloadsInput>
  }

  export type PresetCreateWithoutDownloadsLogInput = {
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPresetsInput
    tags?: TagOnPresetCreateNestedManyWithoutPresetInput
    comments?: CommentCreateNestedManyWithoutPresetInput
    likes?: LikeCreateNestedManyWithoutPresetInput
    favorites?: FavoriteCreateNestedManyWithoutPresetInput
    donations?: DonationCreateNestedManyWithoutPresetInput
  }

  export type PresetUncheckedCreateWithoutDownloadsLogInput = {
    id?: number
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    tags?: TagOnPresetUncheckedCreateNestedManyWithoutPresetInput
    comments?: CommentUncheckedCreateNestedManyWithoutPresetInput
    likes?: LikeUncheckedCreateNestedManyWithoutPresetInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutPresetInput
    donations?: DonationUncheckedCreateNestedManyWithoutPresetInput
  }

  export type PresetCreateOrConnectWithoutDownloadsLogInput = {
    where: PresetWhereUniqueInput
    create: XOR<PresetCreateWithoutDownloadsLogInput, PresetUncheckedCreateWithoutDownloadsLogInput>
  }

  export type UserUpsertWithoutDownloadsInput = {
    update: XOR<UserUpdateWithoutDownloadsInput, UserUncheckedUpdateWithoutDownloadsInput>
    create: XOR<UserCreateWithoutDownloadsInput, UserUncheckedCreateWithoutDownloadsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDownloadsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDownloadsInput, UserUncheckedUpdateWithoutDownloadsInput>
  }

  export type UserUpdateWithoutDownloadsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    donations?: DonationUpdateManyWithoutDonorNestedInput
    receivedDonations?: DonationUpdateManyWithoutCreatorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDownloadsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    donations?: DonationUncheckedUpdateManyWithoutDonorNestedInput
    receivedDonations?: DonationUncheckedUpdateManyWithoutCreatorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PresetUpsertWithoutDownloadsLogInput = {
    update: XOR<PresetUpdateWithoutDownloadsLogInput, PresetUncheckedUpdateWithoutDownloadsLogInput>
    create: XOR<PresetCreateWithoutDownloadsLogInput, PresetUncheckedCreateWithoutDownloadsLogInput>
    where?: PresetWhereInput
  }

  export type PresetUpdateToOneWithWhereWithoutDownloadsLogInput = {
    where?: PresetWhereInput
    data: XOR<PresetUpdateWithoutDownloadsLogInput, PresetUncheckedUpdateWithoutDownloadsLogInput>
  }

  export type PresetUpdateWithoutDownloadsLogInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPresetsNestedInput
    tags?: TagOnPresetUpdateManyWithoutPresetNestedInput
    comments?: CommentUpdateManyWithoutPresetNestedInput
    likes?: LikeUpdateManyWithoutPresetNestedInput
    favorites?: FavoriteUpdateManyWithoutPresetNestedInput
    donations?: DonationUpdateManyWithoutPresetNestedInput
  }

  export type PresetUncheckedUpdateWithoutDownloadsLogInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    tags?: TagOnPresetUncheckedUpdateManyWithoutPresetNestedInput
    comments?: CommentUncheckedUpdateManyWithoutPresetNestedInput
    likes?: LikeUncheckedUpdateManyWithoutPresetNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutPresetNestedInput
    donations?: DonationUncheckedUpdateManyWithoutPresetNestedInput
  }

  export type UserCreateWithoutLikesInput = {
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    donations?: DonationCreateNestedManyWithoutDonorInput
    receivedDonations?: DonationCreateNestedManyWithoutCreatorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLikesInput = {
    id?: number
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    donations?: DonationUncheckedCreateNestedManyWithoutDonorInput
    receivedDonations?: DonationUncheckedCreateNestedManyWithoutCreatorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLikesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
  }

  export type PresetCreateWithoutLikesInput = {
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPresetsInput
    tags?: TagOnPresetCreateNestedManyWithoutPresetInput
    comments?: CommentCreateNestedManyWithoutPresetInput
    downloadsLog?: DownloadHistoryCreateNestedManyWithoutPresetInput
    favorites?: FavoriteCreateNestedManyWithoutPresetInput
    donations?: DonationCreateNestedManyWithoutPresetInput
  }

  export type PresetUncheckedCreateWithoutLikesInput = {
    id?: number
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    tags?: TagOnPresetUncheckedCreateNestedManyWithoutPresetInput
    comments?: CommentUncheckedCreateNestedManyWithoutPresetInput
    downloadsLog?: DownloadHistoryUncheckedCreateNestedManyWithoutPresetInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutPresetInput
    donations?: DonationUncheckedCreateNestedManyWithoutPresetInput
  }

  export type PresetCreateOrConnectWithoutLikesInput = {
    where: PresetWhereUniqueInput
    create: XOR<PresetCreateWithoutLikesInput, PresetUncheckedCreateWithoutLikesInput>
  }

  export type UserUpsertWithoutLikesInput = {
    update: XOR<UserUpdateWithoutLikesInput, UserUncheckedUpdateWithoutLikesInput>
    create: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLikesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLikesInput, UserUncheckedUpdateWithoutLikesInput>
  }

  export type UserUpdateWithoutLikesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    donations?: DonationUpdateManyWithoutDonorNestedInput
    receivedDonations?: DonationUpdateManyWithoutCreatorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    donations?: DonationUncheckedUpdateManyWithoutDonorNestedInput
    receivedDonations?: DonationUncheckedUpdateManyWithoutCreatorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PresetUpsertWithoutLikesInput = {
    update: XOR<PresetUpdateWithoutLikesInput, PresetUncheckedUpdateWithoutLikesInput>
    create: XOR<PresetCreateWithoutLikesInput, PresetUncheckedCreateWithoutLikesInput>
    where?: PresetWhereInput
  }

  export type PresetUpdateToOneWithWhereWithoutLikesInput = {
    where?: PresetWhereInput
    data: XOR<PresetUpdateWithoutLikesInput, PresetUncheckedUpdateWithoutLikesInput>
  }

  export type PresetUpdateWithoutLikesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPresetsNestedInput
    tags?: TagOnPresetUpdateManyWithoutPresetNestedInput
    comments?: CommentUpdateManyWithoutPresetNestedInput
    downloadsLog?: DownloadHistoryUpdateManyWithoutPresetNestedInput
    favorites?: FavoriteUpdateManyWithoutPresetNestedInput
    donations?: DonationUpdateManyWithoutPresetNestedInput
  }

  export type PresetUncheckedUpdateWithoutLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    tags?: TagOnPresetUncheckedUpdateManyWithoutPresetNestedInput
    comments?: CommentUncheckedUpdateManyWithoutPresetNestedInput
    downloadsLog?: DownloadHistoryUncheckedUpdateManyWithoutPresetNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutPresetNestedInput
    donations?: DonationUncheckedUpdateManyWithoutPresetNestedInput
  }

  export type UserCreateWithoutFavoritesInput = {
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryCreateNestedManyWithoutUserInput
    likes?: LikeCreateNestedManyWithoutUserInput
    donations?: DonationCreateNestedManyWithoutDonorInput
    receivedDonations?: DonationCreateNestedManyWithoutCreatorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFavoritesInput = {
    id?: number
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryUncheckedCreateNestedManyWithoutUserInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    donations?: DonationUncheckedCreateNestedManyWithoutDonorInput
    receivedDonations?: DonationUncheckedCreateNestedManyWithoutCreatorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFavoritesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
  }

  export type PresetCreateWithoutFavoritesInput = {
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPresetsInput
    tags?: TagOnPresetCreateNestedManyWithoutPresetInput
    comments?: CommentCreateNestedManyWithoutPresetInput
    downloadsLog?: DownloadHistoryCreateNestedManyWithoutPresetInput
    likes?: LikeCreateNestedManyWithoutPresetInput
    donations?: DonationCreateNestedManyWithoutPresetInput
  }

  export type PresetUncheckedCreateWithoutFavoritesInput = {
    id?: number
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    tags?: TagOnPresetUncheckedCreateNestedManyWithoutPresetInput
    comments?: CommentUncheckedCreateNestedManyWithoutPresetInput
    downloadsLog?: DownloadHistoryUncheckedCreateNestedManyWithoutPresetInput
    likes?: LikeUncheckedCreateNestedManyWithoutPresetInput
    donations?: DonationUncheckedCreateNestedManyWithoutPresetInput
  }

  export type PresetCreateOrConnectWithoutFavoritesInput = {
    where: PresetWhereUniqueInput
    create: XOR<PresetCreateWithoutFavoritesInput, PresetUncheckedCreateWithoutFavoritesInput>
  }

  export type UserUpsertWithoutFavoritesInput = {
    update: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserUpdateWithoutFavoritesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUpdateManyWithoutUserNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    donations?: DonationUpdateManyWithoutDonorNestedInput
    receivedDonations?: DonationUpdateManyWithoutCreatorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFavoritesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUncheckedUpdateManyWithoutUserNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    donations?: DonationUncheckedUpdateManyWithoutDonorNestedInput
    receivedDonations?: DonationUncheckedUpdateManyWithoutCreatorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PresetUpsertWithoutFavoritesInput = {
    update: XOR<PresetUpdateWithoutFavoritesInput, PresetUncheckedUpdateWithoutFavoritesInput>
    create: XOR<PresetCreateWithoutFavoritesInput, PresetUncheckedCreateWithoutFavoritesInput>
    where?: PresetWhereInput
  }

  export type PresetUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: PresetWhereInput
    data: XOR<PresetUpdateWithoutFavoritesInput, PresetUncheckedUpdateWithoutFavoritesInput>
  }

  export type PresetUpdateWithoutFavoritesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPresetsNestedInput
    tags?: TagOnPresetUpdateManyWithoutPresetNestedInput
    comments?: CommentUpdateManyWithoutPresetNestedInput
    downloadsLog?: DownloadHistoryUpdateManyWithoutPresetNestedInput
    likes?: LikeUpdateManyWithoutPresetNestedInput
    donations?: DonationUpdateManyWithoutPresetNestedInput
  }

  export type PresetUncheckedUpdateWithoutFavoritesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    tags?: TagOnPresetUncheckedUpdateManyWithoutPresetNestedInput
    comments?: CommentUncheckedUpdateManyWithoutPresetNestedInput
    downloadsLog?: DownloadHistoryUncheckedUpdateManyWithoutPresetNestedInput
    likes?: LikeUncheckedUpdateManyWithoutPresetNestedInput
    donations?: DonationUncheckedUpdateManyWithoutPresetNestedInput
  }

  export type PresetCreateWithoutCommentsInput = {
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPresetsInput
    tags?: TagOnPresetCreateNestedManyWithoutPresetInput
    downloadsLog?: DownloadHistoryCreateNestedManyWithoutPresetInput
    likes?: LikeCreateNestedManyWithoutPresetInput
    favorites?: FavoriteCreateNestedManyWithoutPresetInput
    donations?: DonationCreateNestedManyWithoutPresetInput
  }

  export type PresetUncheckedCreateWithoutCommentsInput = {
    id?: number
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    tags?: TagOnPresetUncheckedCreateNestedManyWithoutPresetInput
    downloadsLog?: DownloadHistoryUncheckedCreateNestedManyWithoutPresetInput
    likes?: LikeUncheckedCreateNestedManyWithoutPresetInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutPresetInput
    donations?: DonationUncheckedCreateNestedManyWithoutPresetInput
  }

  export type PresetCreateOrConnectWithoutCommentsInput = {
    where: PresetWhereUniqueInput
    create: XOR<PresetCreateWithoutCommentsInput, PresetUncheckedCreateWithoutCommentsInput>
  }

  export type UserCreateWithoutCommentsInput = {
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryCreateNestedManyWithoutUserInput
    likes?: LikeCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    donations?: DonationCreateNestedManyWithoutDonorInput
    receivedDonations?: DonationCreateNestedManyWithoutCreatorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: number
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetUncheckedCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryUncheckedCreateNestedManyWithoutUserInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    donations?: DonationUncheckedCreateNestedManyWithoutDonorInput
    receivedDonations?: DonationUncheckedCreateNestedManyWithoutCreatorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type PresetUpsertWithoutCommentsInput = {
    update: XOR<PresetUpdateWithoutCommentsInput, PresetUncheckedUpdateWithoutCommentsInput>
    create: XOR<PresetCreateWithoutCommentsInput, PresetUncheckedCreateWithoutCommentsInput>
    where?: PresetWhereInput
  }

  export type PresetUpdateToOneWithWhereWithoutCommentsInput = {
    where?: PresetWhereInput
    data: XOR<PresetUpdateWithoutCommentsInput, PresetUncheckedUpdateWithoutCommentsInput>
  }

  export type PresetUpdateWithoutCommentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPresetsNestedInput
    tags?: TagOnPresetUpdateManyWithoutPresetNestedInput
    downloadsLog?: DownloadHistoryUpdateManyWithoutPresetNestedInput
    likes?: LikeUpdateManyWithoutPresetNestedInput
    favorites?: FavoriteUpdateManyWithoutPresetNestedInput
    donations?: DonationUpdateManyWithoutPresetNestedInput
  }

  export type PresetUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    tags?: TagOnPresetUncheckedUpdateManyWithoutPresetNestedInput
    downloadsLog?: DownloadHistoryUncheckedUpdateManyWithoutPresetNestedInput
    likes?: LikeUncheckedUpdateManyWithoutPresetNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutPresetNestedInput
    donations?: DonationUncheckedUpdateManyWithoutPresetNestedInput
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUpdateManyWithoutUserNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    donations?: DonationUpdateManyWithoutDonorNestedInput
    receivedDonations?: DonationUpdateManyWithoutCreatorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUncheckedUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUncheckedUpdateManyWithoutUserNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    donations?: DonationUncheckedUpdateManyWithoutDonorNestedInput
    receivedDonations?: DonationUncheckedUpdateManyWithoutCreatorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutDonationsInput = {
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryCreateNestedManyWithoutUserInput
    likes?: LikeCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    receivedDonations?: DonationCreateNestedManyWithoutCreatorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDonationsInput = {
    id?: number
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryUncheckedCreateNestedManyWithoutUserInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    receivedDonations?: DonationUncheckedCreateNestedManyWithoutCreatorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDonationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDonationsInput, UserUncheckedCreateWithoutDonationsInput>
  }

  export type UserCreateWithoutReceivedDonationsInput = {
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryCreateNestedManyWithoutUserInput
    likes?: LikeCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    donations?: DonationCreateNestedManyWithoutDonorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReceivedDonationsInput = {
    id?: number
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryUncheckedCreateNestedManyWithoutUserInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    donations?: DonationUncheckedCreateNestedManyWithoutDonorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReceivedDonationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedDonationsInput, UserUncheckedCreateWithoutReceivedDonationsInput>
  }

  export type PresetCreateWithoutDonationsInput = {
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPresetsInput
    tags?: TagOnPresetCreateNestedManyWithoutPresetInput
    comments?: CommentCreateNestedManyWithoutPresetInput
    downloadsLog?: DownloadHistoryCreateNestedManyWithoutPresetInput
    likes?: LikeCreateNestedManyWithoutPresetInput
    favorites?: FavoriteCreateNestedManyWithoutPresetInput
  }

  export type PresetUncheckedCreateWithoutDonationsInput = {
    id?: number
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    tags?: TagOnPresetUncheckedCreateNestedManyWithoutPresetInput
    comments?: CommentUncheckedCreateNestedManyWithoutPresetInput
    downloadsLog?: DownloadHistoryUncheckedCreateNestedManyWithoutPresetInput
    likes?: LikeUncheckedCreateNestedManyWithoutPresetInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutPresetInput
  }

  export type PresetCreateOrConnectWithoutDonationsInput = {
    where: PresetWhereUniqueInput
    create: XOR<PresetCreateWithoutDonationsInput, PresetUncheckedCreateWithoutDonationsInput>
  }

  export type UserUpsertWithoutDonationsInput = {
    update: XOR<UserUpdateWithoutDonationsInput, UserUncheckedUpdateWithoutDonationsInput>
    create: XOR<UserCreateWithoutDonationsInput, UserUncheckedCreateWithoutDonationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDonationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDonationsInput, UserUncheckedUpdateWithoutDonationsInput>
  }

  export type UserUpdateWithoutDonationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUpdateManyWithoutUserNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    receivedDonations?: DonationUpdateManyWithoutCreatorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDonationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUncheckedUpdateManyWithoutUserNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    receivedDonations?: DonationUncheckedUpdateManyWithoutCreatorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutReceivedDonationsInput = {
    update: XOR<UserUpdateWithoutReceivedDonationsInput, UserUncheckedUpdateWithoutReceivedDonationsInput>
    create: XOR<UserCreateWithoutReceivedDonationsInput, UserUncheckedCreateWithoutReceivedDonationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedDonationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedDonationsInput, UserUncheckedUpdateWithoutReceivedDonationsInput>
  }

  export type UserUpdateWithoutReceivedDonationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUpdateManyWithoutUserNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    donations?: DonationUpdateManyWithoutDonorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedDonationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUncheckedUpdateManyWithoutUserNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    donations?: DonationUncheckedUpdateManyWithoutDonorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PresetUpsertWithoutDonationsInput = {
    update: XOR<PresetUpdateWithoutDonationsInput, PresetUncheckedUpdateWithoutDonationsInput>
    create: XOR<PresetCreateWithoutDonationsInput, PresetUncheckedCreateWithoutDonationsInput>
    where?: PresetWhereInput
  }

  export type PresetUpdateToOneWithWhereWithoutDonationsInput = {
    where?: PresetWhereInput
    data: XOR<PresetUpdateWithoutDonationsInput, PresetUncheckedUpdateWithoutDonationsInput>
  }

  export type PresetUpdateWithoutDonationsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPresetsNestedInput
    tags?: TagOnPresetUpdateManyWithoutPresetNestedInput
    comments?: CommentUpdateManyWithoutPresetNestedInput
    downloadsLog?: DownloadHistoryUpdateManyWithoutPresetNestedInput
    likes?: LikeUpdateManyWithoutPresetNestedInput
    favorites?: FavoriteUpdateManyWithoutPresetNestedInput
  }

  export type PresetUncheckedUpdateWithoutDonationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    tags?: TagOnPresetUncheckedUpdateManyWithoutPresetNestedInput
    comments?: CommentUncheckedUpdateManyWithoutPresetNestedInput
    downloadsLog?: DownloadHistoryUncheckedUpdateManyWithoutPresetNestedInput
    likes?: LikeUncheckedUpdateManyWithoutPresetNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutPresetNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryCreateNestedManyWithoutUserInput
    likes?: LikeCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    donations?: DonationCreateNestedManyWithoutDonorInput
    receivedDonations?: DonationCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: number
    name: string
    email: string
    password: string
    avatar?: string | null
    bio?: string | null
    role?: string
    mustChangePassword?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    presets?: PresetUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    downloads?: DownloadHistoryUncheckedCreateNestedManyWithoutUserInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    donations?: DonationUncheckedCreateNestedManyWithoutDonorInput
    receivedDonations?: DonationUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUpdateManyWithoutUserNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    donations?: DonationUpdateManyWithoutDonorNestedInput
    receivedDonations?: DonationUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presets?: PresetUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    downloads?: DownloadHistoryUncheckedUpdateManyWithoutUserNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    donations?: DonationUncheckedUpdateManyWithoutDonorNestedInput
    receivedDonations?: DonationUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type PresetCreateManyUserInput = {
    id?: number
    title: string
    description?: string | null
    daw: string
    format: string
    filePath: string
    fileSize: number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: string | null
    downloads?: number
    likesCount?: number
    favoritesCount?: number
    isPublic?: boolean
    previewAudio?: string | null
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentCreateManyUserInput = {
    id?: number
    content: string
    presetId: number
    parentId?: number | null
    createdAt?: Date | string
  }

  export type DownloadHistoryCreateManyUserInput = {
    id?: number
    presetId: number
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type LikeCreateManyUserInput = {
    id?: number
    presetId: number
    createdAt?: Date | string
  }

  export type FavoriteCreateManyUserInput = {
    id?: number
    presetId: number
    createdAt?: Date | string
  }

  export type DonationCreateManyDonorInput = {
    id?: number
    amount: number
    currency?: string
    creatorId: number
    presetId?: number | null
    message?: string | null
    createdAt?: Date | string
  }

  export type DonationCreateManyCreatorInput = {
    id?: number
    amount: number
    currency?: string
    donorId: number
    presetId?: number | null
    message?: string | null
    createdAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: number
    title: string
    content: string
    link?: string | null
    read?: boolean
    type: string
    createdAt?: Date | string
  }

  export type PresetUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagOnPresetUpdateManyWithoutPresetNestedInput
    comments?: CommentUpdateManyWithoutPresetNestedInput
    downloadsLog?: DownloadHistoryUpdateManyWithoutPresetNestedInput
    likes?: LikeUpdateManyWithoutPresetNestedInput
    favorites?: FavoriteUpdateManyWithoutPresetNestedInput
    donations?: DonationUpdateManyWithoutPresetNestedInput
  }

  export type PresetUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagOnPresetUncheckedUpdateManyWithoutPresetNestedInput
    comments?: CommentUncheckedUpdateManyWithoutPresetNestedInput
    downloadsLog?: DownloadHistoryUncheckedUpdateManyWithoutPresetNestedInput
    likes?: LikeUncheckedUpdateManyWithoutPresetNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutPresetNestedInput
    donations?: DonationUncheckedUpdateManyWithoutPresetNestedInput
  }

  export type PresetUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    daw?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    files?: NullableJsonNullValueInput | InputJsonValue
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    downloads?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favoritesCount?: IntFieldUpdateOperationsInput | number
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    previewAudio?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preset?: PresetUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    presetId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    presetId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DownloadHistoryUpdateWithoutUserInput = {
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preset?: PresetUpdateOneRequiredWithoutDownloadsLogNestedInput
  }

  export type DownloadHistoryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    presetId?: IntFieldUpdateOperationsInput | number
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DownloadHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    presetId?: IntFieldUpdateOperationsInput | number
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preset?: PresetUpdateOneRequiredWithoutLikesNestedInput
  }

  export type LikeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    presetId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    presetId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preset?: PresetUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    presetId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    presetId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonationUpdateWithoutDonorInput = {
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutReceivedDonationsNestedInput
    preset?: PresetUpdateOneWithoutDonationsNestedInput
  }

  export type DonationUncheckedUpdateWithoutDonorInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    creatorId?: IntFieldUpdateOperationsInput | number
    presetId?: NullableIntFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonationUncheckedUpdateManyWithoutDonorInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    creatorId?: IntFieldUpdateOperationsInput | number
    presetId?: NullableIntFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonationUpdateWithoutCreatorInput = {
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    donor?: UserUpdateOneRequiredWithoutDonationsNestedInput
    preset?: PresetUpdateOneWithoutDonationsNestedInput
  }

  export type DonationUncheckedUpdateWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    donorId?: IntFieldUpdateOperationsInput | number
    presetId?: NullableIntFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonationUncheckedUpdateManyWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    donorId?: IntFieldUpdateOperationsInput | number
    presetId?: NullableIntFieldUpdateOperationsInput | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagOnPresetCreateManyPresetInput = {
    tagId: number
  }

  export type CommentCreateManyPresetInput = {
    id?: number
    content: string
    userId: number
    parentId?: number | null
    createdAt?: Date | string
  }

  export type DownloadHistoryCreateManyPresetInput = {
    id?: number
    userId?: number | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type LikeCreateManyPresetInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type FavoriteCreateManyPresetInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type DonationCreateManyPresetInput = {
    id?: number
    amount: number
    currency?: string
    donorId: number
    creatorId: number
    message?: string | null
    createdAt?: Date | string
  }

  export type TagOnPresetUpdateWithoutPresetInput = {
    tag?: TagUpdateOneRequiredWithoutPresetsNestedInput
  }

  export type TagOnPresetUncheckedUpdateWithoutPresetInput = {
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type TagOnPresetUncheckedUpdateManyWithoutPresetInput = {
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type CommentUpdateWithoutPresetInput = {
    content?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutPresetInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutPresetInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DownloadHistoryUpdateWithoutPresetInput = {
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutDownloadsNestedInput
  }

  export type DownloadHistoryUncheckedUpdateWithoutPresetInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DownloadHistoryUncheckedUpdateManyWithoutPresetInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUpdateWithoutPresetInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLikesNestedInput
  }

  export type LikeUncheckedUpdateWithoutPresetInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUncheckedUpdateManyWithoutPresetInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUpdateWithoutPresetInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateWithoutPresetInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUncheckedUpdateManyWithoutPresetInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonationUpdateWithoutPresetInput = {
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    donor?: UserUpdateOneRequiredWithoutDonationsNestedInput
    creator?: UserUpdateOneRequiredWithoutReceivedDonationsNestedInput
  }

  export type DonationUncheckedUpdateWithoutPresetInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    donorId?: IntFieldUpdateOperationsInput | number
    creatorId?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DonationUncheckedUpdateManyWithoutPresetInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    donorId?: IntFieldUpdateOperationsInput | number
    creatorId?: IntFieldUpdateOperationsInput | number
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagOnPresetCreateManyTagInput = {
    presetId: number
  }

  export type TagOnPresetUpdateWithoutTagInput = {
    preset?: PresetUpdateOneRequiredWithoutTagsNestedInput
  }

  export type TagOnPresetUncheckedUpdateWithoutTagInput = {
    presetId?: IntFieldUpdateOperationsInput | number
  }

  export type TagOnPresetUncheckedUpdateManyWithoutTagInput = {
    presetId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}