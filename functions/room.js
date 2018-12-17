'use strict'

class Room {
    constructor(roomId, topic, note, createdAt, questsMaster, levelsMaster, elementsMaster) {
        this.id = roomId;
        this.topic = topic;
        const data = topic.split('-');
        this.groupId = data[0];
        this.questId = data[1];
        this.level = data[2];
        this.note = note;
        this.createdAt = new Date(Number(createdAt));
        this.levelName = levelsMaster[this.level];
        questsMaster.some((group) => {
            if (group.id == this.groupId) {
                this.groupName = group.name;
                group.quests.some((quest) => {
                    if (quest.id == this.questId) {
                        this.questName = quest.name;
                        this.element = quest.element;
                        this.elementName = elementsMaster[quest.element];
                        return true;
                    }
                });
                return true;
            }
        });
    }
}

if (typeof(exports) !== 'undefined') {
    module.exports = Room;
}
