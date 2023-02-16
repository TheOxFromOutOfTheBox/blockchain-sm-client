import React from 'react'

function ListMessage(props) {
  const listMessages = async () => {
    const messages = await fetchMessagesForSchema(
      parseInt(props.schema.schema_id)
    );

    let allMessages = messages.map((msg, index) => {
      return {
        key: index,
        payload: staticSchema.fromBuffer(
          Buffer.from(msg.payload.unwrap().buffer)
        ),
      };
    });

    setListOfMessage(allMessages);
  }
  useEffect(() => {
    fetchData();
    setLoading(false);
}, [props.schema.schema_id])
  return (
    <>
      <Space direction="vertical">
        <Button onClick={listMessages}>Refresh Messages</Button>
        <Table dataSource={listOfMessages} size="small">
          <Column
            title="Messages"
            dataIndex="payload"
            render={(msg) => (
              <pre>{JSON.stringify({ msg }, null, 2)}</pre>
            )}
          />
        </Table>
      </Space>
    </>
  )
}

export default ListMessage