import { Fr } from '../index.js';
import { BufferReader } from '../../serialize/buffer_reader.js';
export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static random() {
        // TODO: This is not a point on the curve!
        return new Point(Fr.random(), Fr.random());
    }
    static fromBuffer(buffer) {
        const reader = BufferReader.asReader(buffer);
        return new this(Fr.fromBuffer(reader), Fr.fromBuffer(reader));
    }
    static fromString(address) {
        return Point.fromBuffer(Buffer.from(address.replace(/^0x/i, ''), 'hex'));
    }
    toBuffer() {
        return Buffer.concat([this.x.toBuffer(), this.y.toBuffer()]);
    }
    toString() {
        return '0x' + this.toBuffer().toString('hex');
    }
    equals(rhs) {
        return this.x.equals(rhs.x) && this.y.equals(rhs.y);
    }
}
Point.SIZE_IN_BYTES = 64;
Point.EMPTY = new Point(Fr.ZERO, Fr.ZERO);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZXMvbm9kZS9wb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVoRSxNQUFNLE9BQU8sS0FBSztJQUloQixZQUE0QixDQUFLLEVBQWtCLENBQUs7UUFBNUIsTUFBQyxHQUFELENBQUMsQ0FBSTtRQUFrQixNQUFDLEdBQUQsQ0FBQyxDQUFJO0lBQUcsQ0FBQztJQUU1RCxNQUFNLENBQUMsTUFBTTtRQUNYLDBDQUEwQztRQUMxQyxPQUFPLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFpQztRQUNqRCxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBZTtRQUMvQixPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7O0FBN0JNLG1CQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ25CLFdBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyJ9