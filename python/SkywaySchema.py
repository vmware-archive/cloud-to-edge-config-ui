
def createTableEnvironments(cursor):
    cursor.execute('''CREATE TABLE IF NOT EXISTS Environments(
            id int,
            name text
            )''')


def createTableVCenters(cursor):
    cursor.execute('''CREATE TABLE IF NOT EXISTS VCenters(
            id int,
            name text
            )''')


def createTableClusters(cursor):
    cursor.execute('''CREATE TABLE IF NOT EXISTS Clusters(
            id int,
            name text
            )''')


def createTableEdges(cursor):
    cursor.execute('''CREATE TABLE IF NOT EXISTS Edges(
            id int,
            name text
            )''')

def populateTestData(cursor):
    cursor.execute("""insert into Environments values (1, 'Test Env')""")
    cursor.execute("""insert into VCenters values (1, 'Test VCenter')""")
