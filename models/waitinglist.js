module.exports = (sequelize, DataTypes) => {
    const WaitingList = sequelize.define(
        "WaitingList",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(40),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(40), // 40자이내
                allowNull: false, // 필수
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci", //한글저장
        } // sequelize가 create_at updated_at 자동으로 생성
    );
    WaitingList.associate = (db) => {
        //
    };
    return WaitingList;
};
