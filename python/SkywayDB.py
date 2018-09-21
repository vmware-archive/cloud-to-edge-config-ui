import sqlite3

import SkywaySchema

class DB(object):
    sqlfile = "./skyway_config_ui.db"

    def __init__(self):
        self.connection = sqlite3.connect(self.sqlfile)
        self.cursor = self.connection.cursor()

    def close(self):
        self.commit()
        self.connection.close()

    def commit(self):
        self.connection.commit()

    def getCursor(self):
        return self.cursor

    def query(self, statement):
        self.cursor.execute(statement.strip())
        return self.cursor.fetchall()

    def execute(self, statement):
        self.cursor.execute(statement.strip())

    def createSchema(self):
        SkywaySchema.createTableEnvironments(self.cursor)
        SkywaySchema.createTableVCenters(self.cursor)
        SkywaySchema.createTableClusters(self.cursor)
        SkywaySchema.createTableEdges(self.cursor)
        self.commit()

    def populateTestData(self):
        SkywaySchema.populateTestData(self.cursor)
        self.commit()


    def getVCenter(self, id):
        data = self.cursor.execute('''select * from VCenters where id=?''', [id])
        return data.fetchall()
