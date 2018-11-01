
def createTableEnvironments(cursor):
    cursor.execute('''CREATE TABLE IF NOT EXISTS Environments(
            id int,
            name text,
            deployUniform int,
            deployCustom int,
            typeGG int,
            typeAzure int,
            ftStandard int,
            ftNoDown int,
            location text,
            contact text,
            git_key text,
            ntpservers text,
            dnsserver text,
            dnsdomain text,
            defaultgateway text,
            netmask text,
            binary_webserver text,
            base_ova_name text,
            base_ova_name_arm text,
            ovftool_image text,
            c2e_edge_vm_basename text,
            c2e_edge_vm_user text,
            c2e_edge_vm_password text,
            c2e_edge_vm_network text,
            c2e_edge_vm_ssh_priv_key text,
            c2e_edge_vm_ssh_pub_key text,
            azure_cli_application_id text,
            azure_cli_application_key text,
            azure_cli_tenant_id text,
            azure_iot_hub_name text,
            azure_iot_group text,
            aws_access_key text,
            aws_secret_key text,
            greengrass_s3_bucket text,
            greengrass_device_stub text,
            greengrass_device_count int
            )''')


def createTableVCenters(cursor):
    cursor.execute('''CREATE TABLE IF NOT EXISTS VCenters(
            id int,
            name text,
            id_env int,
            host text,
            user text,
            password text
            )''')


def createTableClusters(cursor):
    cursor.execute('''CREATE TABLE IF NOT EXISTS Clusters(
            id int,
            name text,
            id_vcenter int,
            vcenter_datacenter text,
            vcenter_datastore text,
            vcenter_rp text,
            vcenter_insecure int
            )''')


def createTableEdges(cursor):
    cursor.execute('''CREATE TABLE IF NOT EXISTS Edges(
            id int,
            name text,
            id_clusters int,
            typeGG int,
            typeAzure int
            )''')

def populateTestData(cursor):
    cursor.execute("""insert into Environments (
            id,
            name,
            deployUniform,
            deployCustom,
            typeGG,
            typeAzure,
            ftStandard,
            ftNoDown,
            location,
            contact,
            ntpservers,
            dnsserver,
            dnsdomain,
            defaultgateway,
            netmask,
            binary_webserver,
            base_ova_name,
            base_ova_name_arm,
            ovftool_image,
            c2e_edge_vm_basename,
            c2e_edge_vm_user,
            c2e_edge_vm_password,
            c2e_edge_vm_network,
            azure_cli_application_id,
            azure_cli_application_key,
            azure_cli_tenant_id,
            azure_iot_hub_name,
            azure_iot_group,
            greengrass_s3_bucket,
            greengrass_device_stub,
            greengrass_device_count
    ) values (
              1,
              'Test Env',
              1,
              0,
              1,
              1,
              0,
              1,
              'Env Location',
              'user@corp.com',
              'pool.ntp.org',
              '8.8.8.8',
              'corp.com',
              '192.168.0.1',
              '255.255.255.0',
              'binary_webserver',
              'base_ova_name',
              'base_ova_name_arm',
              'ovftool_image',
              'skywaybase',
              'administrator',
              'VMware1!',
              'default_network',
              'AZ-123',
              'AZ-Key',
              'AZ-Tenant',
              'AZ-Hub',
              'AZ-Group',
              'GG-Bucket',
              'GG-Stub',
              'GG-DevCount'
          )""")




    cursor.execute("""insert into VCenters (
              id,
              name,
              id_env,
              host,
              user,
              password
    ) values (
              1,
              'Test vCenter',
              1,
              'http://vcenter1.corp.com',
              'administrator@vsphere.local',
              'VMware1!'
    )""")



    cursor.execute("""insert into Clusters (
              id,
              name,
              id_vcenter,
              vcenter_datacenter,
              vcenter_datastore,
              vcenter_rp,
              vcenter_insecure
    ) values (
              1,
              'Test Cluster',
              1,
              'VC DataCenter',
              'VC DataStore',
              'VC Resource Pool',
              1
    )""")

    cursor.execute("""insert into Edges (
             id,
            name,
            id_clusters,
            typeGG,
            typeAzure
    ) values (
             1,
            'Test Edge',
            1,
            1,
            1
    )""")
