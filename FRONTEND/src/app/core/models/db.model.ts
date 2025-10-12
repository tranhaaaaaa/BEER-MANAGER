type TUser = User;
type TShop = Shop;
type TProduct = Product;
type TOrder = Order;
type TOrderItem = OrderItem;
type TLogging = Logging;
import { JsonObject, JsonProperty, JsonConverter, JsonConvert, JsonCustomConvert } from 'json2typescript';

@JsonConverter
export class NumberConverter implements JsonCustomConvert<number> {
    serialize(data: any): number {
        if (Number.isNaN(data)) {
            return data;
        } else {
            return Number(data);
        }
    }
    deserialize(data: any): number {
        if (typeof data === 'undefined' || data === null) {
            return data;
        }
        if (Number.isNaN(data)) {
            return data;
        } else {
            return Number(data);
        }
    }
}
@JsonConverter
export class StringConverter implements JsonCustomConvert<string> {
    serialize(data: any): string {
        if (data) {
            return data.toString();
        } else {
            return data;
        }
    }
    deserialize(data: any): string {
        if (data) {
            return data.toString();
        } else {
            return data;
        }
    }
}
@JsonConverter
export class BooleanConverter implements JsonCustomConvert<boolean> {
    serialize(data: any): boolean {
        if (typeof (data) === 'boolean') {
            return data;
        } else {
            return data;
        }
    }
    deserialize(data: any): boolean {
        if (typeof (data) === 'boolean') {
            return data;
        } else {
            return data;
        }
    }
}
@JsonConverter
export class DateTimeConverter implements JsonCustomConvert<Date> {
    serialize(date: Date): any {
        function pad(number: any) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            '.' + (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
            'Z';
    }
    deserialize(date: any): Date {
        const dReturn = new Date(date);
        if (dReturn.getFullYear() === 1970
            && dReturn.getMonth() === 0
            && dReturn.getDate() === 1) {
            return null as any;
        } else {
            return dReturn;
        }
    }
}
@JsonConverter
export class ShopConverter implements JsonCustomConvert<Shop> {
    serialize(data: Shop): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): Shop {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, Shop);
    }
}
@JsonConverter
export class LoggingArrayConverter implements JsonCustomConvert<Logging[]> {
    serialize(data: Logging[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Logging[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Logging);
    }
}
@JsonConverter
export class OrderArrayConverter implements JsonCustomConvert<Order[]> {
    serialize(data: Order[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Order[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Order);
    }
}
@JsonConverter
export class ProductArrayConverter implements JsonCustomConvert<Product[]> {
    serialize(data: Product[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Product[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Product);
    }
}
@JsonConverter
export class UserArrayConverter implements JsonCustomConvert<User[]> {
    serialize(data: User[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): User[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, User);
    }
}
@JsonConverter
export class OrderItemArrayConverter implements JsonCustomConvert<OrderItem[]> {
    serialize(data: OrderItem[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): OrderItem[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, OrderItem);
    }
}
@JsonConverter
export class UserConverter implements JsonCustomConvert<User> {
    serialize(data: User): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): User {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, User);
    }
}
@JsonConverter
export class OrderConverter implements JsonCustomConvert<Order> {
    serialize(data: Order): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): Order {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, Order);
    }
}
@JsonConverter
export class ProductConverter implements JsonCustomConvert<Product> {
    serialize(data: Product): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): Product {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, Product);
    }
}

@JsonObject('User')
export class User {

    @JsonProperty('Uid', StringConverter, true)
    Uid: string = undefined as any;

    @JsonProperty('Name', StringConverter, true)
    Name: string = undefined as any;

    @JsonProperty('Phone', StringConverter, true)
    Phone: string = undefined as any;

    @JsonProperty('Address', StringConverter, true)
    Address: string = undefined as any;

    @JsonProperty('CreatedAt', DateTimeConverter, true)
    CreatedAt: Date = undefined as any;

    @JsonProperty('ShopUid', StringConverter, true)
    ShopUid: string = undefined as any;

    @JsonProperty('ShopU', ShopConverter, true)
    ShopU: Shop = undefined as any;

    @JsonProperty('Loggings', LoggingArrayConverter, true)
    Loggings: Logging[] = [] as any;

    @JsonProperty('Orders', OrderArrayConverter, true)
    Orders: Order[] = [] as any;

}

@JsonObject('Shop')
export class Shop {

    @JsonProperty('ShopUid', StringConverter, true)
    ShopUid: string = undefined as any;

    @JsonProperty('ShopName', StringConverter, true)
    ShopName: string = undefined as any;

    @JsonProperty('Username', StringConverter, true)
    Username: string = undefined as any;

    @JsonProperty('Password', StringConverter, true)
    Password: string = undefined as any;

    @JsonProperty('CreatedAt', DateTimeConverter, true)
    CreatedAt: Date = undefined as any;

    @JsonProperty('Img', StringConverter, true)
    Img: string = undefined as any;

    @JsonProperty('Orders', OrderArrayConverter, true)
    Orders: Order[] = [] as any;

    @JsonProperty('Products', ProductArrayConverter, true)
    Products: Product[] = [] as any;

    @JsonProperty('Users', UserArrayConverter, true)
    Users: User[] = [] as any;

}

@JsonObject('Product')
export class Product {

    @JsonProperty('ProductUid', StringConverter, true)
    ProductUid: string = undefined as any;

    @JsonProperty('ShopUid', StringConverter, true)
    ShopUid: string = undefined as any;

    @JsonProperty('ProductName', StringConverter, true)
    ProductName: string = undefined as any;

    @JsonProperty('Description', StringConverter, true)
    Description: string = undefined as any;

    @JsonProperty('Price', NumberConverter, true)
    Price: number = undefined as any;

    @JsonProperty('Stock', NumberConverter, true)
    Stock: number = undefined as any;

    @JsonProperty('Type', NumberConverter, true)
    Type: number = undefined as any;

    @JsonProperty('CreatedAt', DateTimeConverter, true)
    CreatedAt: Date = undefined as any;

    @JsonProperty('PriceConfig', NumberConverter, true)
    PriceConfig: number = undefined as any;

    @JsonProperty('Img', StringConverter, true)
    Img: string = undefined as any;

    @JsonProperty('ShopU', ShopConverter, true)
    ShopU: Shop = undefined as any;

    @JsonProperty('OrderItems', OrderItemArrayConverter, true)
    OrderItems: OrderItem[] = [] as any;

}

@JsonObject('Order')
export class Order {

    @JsonProperty('OrderUid', StringConverter, true)
    OrderUid: string = undefined as any;

    @JsonProperty('UserUid', StringConverter, true)
    UserUid: string = undefined as any;

    @JsonProperty('OrderDate', DateTimeConverter, true)
    OrderDate: Date = undefined as any;

    @JsonProperty('Status', NumberConverter, true)
    Status: number = undefined as any;

    @JsonProperty('TotalAmount', NumberConverter, true)
    TotalAmount: number = undefined as any;

    @JsonProperty('PaymentType', NumberConverter, true)
    PaymentType: number = undefined as any;

    @JsonProperty('ShopUid', StringConverter, true)
    ShopUid: string = undefined as any;

    @JsonProperty('Name', StringConverter, true)
    Name: string = undefined as any;

    @JsonProperty('Type', StringConverter, true)
    Type: string = undefined as any;

    @JsonProperty('ShopU', ShopConverter, true)
    ShopU: Shop = undefined as any;

    @JsonProperty('UserU', UserConverter, true)
    UserU: User = undefined as any;

    @JsonProperty('OrderItems', OrderItemArrayConverter, true)
    OrderItems: OrderItem[] = [] as any;

}

@JsonObject('OrderItem')
export class OrderItem {

    @JsonProperty('OrderItemUid', StringConverter, true)
    OrderItemUid: string = undefined as any;

    @JsonProperty('OrderUid', StringConverter, true)
    OrderUid: string = undefined as any;

    @JsonProperty('ProductUid', StringConverter, true)
    ProductUid: string = undefined as any;

    @JsonProperty('Quantity', NumberConverter, true)
    Quantity: number = undefined as any;

    @JsonProperty('UnitPrice', NumberConverter, true)
    UnitPrice: number = undefined as any;

    @JsonProperty('OrderU', OrderConverter, true)
    OrderU: Order = undefined as any;

    @JsonProperty('ProductU', ProductConverter, true)
    ProductU: Product = undefined as any;

}

@JsonObject('Logging')
export class Logging {

    @JsonProperty('LogUid', StringConverter, true)
    LogUid: string = undefined as any;

    @JsonProperty('UserUid', StringConverter, true)
    UserUid: string = undefined as any;

    @JsonProperty('Action', StringConverter, true)
    Action: string = undefined as any;

    @JsonProperty('TableName', StringConverter, true)
    TableName: string = undefined as any;

    @JsonProperty('Level', StringConverter, true)
    Level: string = undefined as any;

    @JsonProperty('RecordUid', StringConverter, true)
    RecordUid: string = undefined as any;

    @JsonProperty('Message', StringConverter, true)
    Message: string = undefined as any;

    @JsonProperty('CreatedAt', DateTimeConverter, true)
    CreatedAt: Date = undefined as any;

    @JsonProperty('UserU', UserConverter, true)
    UserU: User = undefined as any;

}
@JsonObject('Table')
export class Table {

    @JsonProperty('TableID', StringConverter, true)
    TableID: string = undefined as any;

    @JsonProperty('Name', StringConverter, true)
    Name: string = undefined as any;

    @JsonProperty('OrderID', StringConverter, true)
    OrderID: string = undefined as any;

    @JsonProperty('Status', NumberConverter, true)
    Status: number = undefined as any;

    @JsonProperty('CreatedAt', DateTimeConverter, true)
    CreatedAt: Date = undefined as any;
}