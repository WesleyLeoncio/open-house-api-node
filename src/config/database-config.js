// Configuração do banco de dados no ambiente de utils
export const databaseConfig = {
    dialect: 'sqlite',
    storage: 'database.sqlite',
    define: {
        timestamps: true,
        freezeTableName: true,
        underscored: true
    }
};


// Configuração do banco de dados no ambiente de desenvolvimento
// export const databaseConfig = {
//   dialect: 'postgres',
//   host: 'localhost',
//   username: 'postgres',
//   password: 'postgres',
//   database: 'open-house-node',
//   define: {
//     timestamps: true,
//     freezeTableName: true,
//     underscored: true
//   }
// };


/*
// Configuração do banco de dados no ambiente de produção
export const databaseConfig = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'open-house',
  define: {
    timestamps: true,
    freezeTableName: true,
    underscored: true
  }
};
*/
