//codigo en tres direcciones
class IntermediateCodeGenerator {
    constructor(ast) {
      this.ast = ast;
      this.code = [];
      this.tempCount = 0;
    }
  
    generate() {
      this.generateCode(this.ast);
      return this.code;
    }
  
    generateCode(node) {
        switch (node.type) {
          case 'Program':
            return node.body.flatMap(this.generateCode.bind(this));
          case 'AssignmentExpression':
            return this.generateAssignment(node);
          case 'BinaryExpression':
            return this.generateBinaryExpression(node);
          case 'NumericLiteral':
            return node.value;
          case 'VariableReference':
            return node.name;
          //add more cases
          default:
            throw new Error(`Tipo de nodo no soportado: ${node.type}`);
        }
      }

      generateAssignment(node) {
        const tempVar = this.newTemp();
        const value = this.generateCode(node.value);
        this.code.push(`${tempVar} = ${value}`);
        this.code.push(`${node.name} = ${tempVar}`);
      }
      
      generateBinaryExpression(node) {
        const tempVar = this.newTemp();
        const left = this.generateCode(node.left);
        const right = this.generateCode(node.right);
        this.code.push(`${tempVar} = ${left} ${node.operator} ${right}`);
        return tempVar;
      }
  
    newTemp() {
      return `t${this.tempCount++}`;
    }
  }
  
  module.exports = IntermediateCodeGenerator;