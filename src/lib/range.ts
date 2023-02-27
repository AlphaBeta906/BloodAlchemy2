export default function range(startNum: number, endNum: number) {
	const arr: Array<number> = startNum < endNum ? range(startNum + 1, endNum) : [];
	
	arr.unshift(startNum);
  
	return arr;
}