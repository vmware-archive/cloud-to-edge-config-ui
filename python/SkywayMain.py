from SkywayDB import DB
import SkywayConfigServer

db = DB()


def setup():

    db.createSchema()
    db.populateTestData()

    data = db.query('''select ROWID, * from Environments''')
    print("Data: ", data)

    vc = db.getVCenter(1)
    print("VC: ", vc)


if __name__ == '__main__':
  setup()
  SkywayConfigServer.runServer('4201')
