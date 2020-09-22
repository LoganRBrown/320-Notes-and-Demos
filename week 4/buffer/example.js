


const buff1 = buffer.from("hello");

const buff2 = buffer.from([255]);

const buff3 = buffer.alloc(10);

buff3.writeUInt8(255, 3);

buff3.writeUInt16BE(1024, 5); //Big-Endian notation write left-to-right

var val = buff3.readUInt8(5);

console.log(val);