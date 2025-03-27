class SkillModel {
  constructor(name) {
    this.id = Date.now();
    this.name = name;
    this.originalName = name;
    this.level = 0;
  }
}

export default SkillModel;
