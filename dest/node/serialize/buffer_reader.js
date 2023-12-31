export class BufferReader {
    constructor(buffer, offset = 0) {
        this.buffer = buffer;
        this.index = offset;
    }
    static asReader(bufferOrReader) {
        return bufferOrReader instanceof BufferReader ? bufferOrReader : new BufferReader(bufferOrReader);
    }
    readNumber() {
        const dataView = new DataView(this.buffer.buffer, this.buffer.byteOffset + this.index, 4);
        this.index += 4;
        return dataView.getUint32(0, false);
    }
    readBoolean() {
        this.index += 1;
        return Boolean(this.buffer.at(this.index - 1));
    }
    readBytes(n) {
        this.index += n;
        return this.buffer.slice(this.index - n, this.index);
    }
    readNumberVector() {
        return this.readVector({
            fromBuffer: (reader) => reader.readNumber(),
        });
    }
    readVector(itemDeserializer) {
        const size = this.readNumber();
        const result = new Array(size);
        for (let i = 0; i < size; i++) {
            result[i] = itemDeserializer.fromBuffer(this);
        }
        return result;
    }
    readArray(size, itemDeserializer) {
        const result = new Array(size);
        for (let i = 0; i < size; i++) {
            result[i] = itemDeserializer.fromBuffer(this);
        }
        return result;
    }
    readObject(deserializer) {
        return deserializer.fromBuffer(this);
    }
    peekBytes(n) {
        return this.buffer.subarray(this.index, n ? this.index + n : undefined);
    }
    readString() {
        return new TextDecoder().decode(this.readBuffer());
    }
    readBuffer() {
        const size = this.readNumber();
        return this.readBytes(size);
    }
    readMap(deserializer) {
        const numEntries = this.readNumber();
        const map = {};
        for (let i = 0; i < numEntries; i++) {
            const key = this.readString();
            const value = this.readObject(deserializer);
            map[key] = value;
        }
        return map;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyX3JlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJpYWxpemUvYnVmZmVyX3JlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sWUFBWTtJQUV2QixZQUFvQixNQUFrQixFQUFFLE1BQU0sR0FBRyxDQUFDO1FBQTlCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDdEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBeUM7UUFDOUQsT0FBTyxjQUFjLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFFTSxVQUFVO1FBQ2YsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNoQixPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ2hCLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sU0FBUyxDQUFDLENBQVM7UUFDeEIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxH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