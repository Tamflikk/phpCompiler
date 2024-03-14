class CodeGenerator {
    constructor(intermediateCode) {
      this.intermediateCode = intermediateCode;
      this.objectCode = [];
    }
  
    generate() {
        for (const instruction of this.intermediateCode) {
          const [target, operation, operand1, operand2] = instruction.split(' ');
          if (operation === '=') {
            this.objectCode.push(`mov ${target}, ${operand1}`);
          } else if (operation === '+') {
            this.objectCode.push(`mov eax, ${operand1}`);
            this.objectCode.push(`add eax, ${operand2}`);
            this.objectCode.push(`mov ${target}, eax`);
          }
          //add more cases
        }
        return this.objectCode;
      }
  }
  
  module.exports = CodeGenerator;