export default function SetLogData(rawData: any) {
  return rawData.Records.map((record: any) => {
    let userName = null;

    if (record.userIdentity.type === 'IAMUser') {
      userName = record.userIdentity.userName;
    } else if (record.userIdentity.type === 'AssumedRole') {
      const principalIdParts = record.userIdentity.principalId.split(':');
      if (principalIdParts.length > 1) {
        userName = principalIdParts[1];
      }
    }

    return {
      eventName: record.eventName,
      eventTime: record.eventTime,
      userName: userName,
      eventSource: record.eventSource,
      awsRegion: record.awsRegion,
      eventID: record.eventID,
      sourceIPAddress: record.sourceIPAddress,
      requestID: record.requestID || null,
      eventType: record.eventType,
    };
  });
}
