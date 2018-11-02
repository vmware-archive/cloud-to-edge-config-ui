from C2EDB import DB
import C2EConfigServer

db = DB()


def setup():

    db.createSchema()
    db.populateTestData()

    data = db.query('''select * from Environments''')
    print("Environments: ", data)

    data = db.query('''select * from VCenters''')
    print("vCenters: ", data)

    data = db.query('''select * from Clusters''')
    print("Clusters: ", data)

    data = db.query('''select * from Edges''')
    print("Edges: ", data)

    vc = db.getVCenter(1)
    print("VC: ", vc)


if __name__ == '__main__':
  setup()
  C2EConfigServer.runServer('4201')
