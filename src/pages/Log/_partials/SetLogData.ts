export default function SetLogData(rawData: any) {
  return rawData.Events.map((data: any) => {
    const resources =
      data.Resources.length > 0
        ? data.Resources.map((resource: any) => ({
            resourceType: resource.ResourceType,
            resourceName: resource.ResourceName,
          }))
        : null;

    const cloudTrailEvent = JSON.parse(data.CloudTrailEvent);

    return {
      eventName: data.EventName || null,
      eventTime: data.EventTime || null,
      userName: data.Username || null,
      eventSource: data.EventSource || null,
      resourceType: resources ? resources.map((res) => res.resourceType) : null,
      resourceName: resources ? resources.map((res) => res.resourceName) : null,
      awsRegion: cloudTrailEvent.awsRegion || null,
      eventID: data.EventId || null,
      accessKeyId: data.AccessId || null,
      sourceIPAddress: cloudTrailEvent.sourceIPAddress || null,
      requestID: cloudTrailEvent.requestID || null,
      eventType: cloudTrailEvent.eventType || null,
    };
  });
  // return rawData.Records.map((data: any) => {
  //   let userName = null;
  //   let resourceType: string[] = [];
  //   let resourceName: string[] = [];

  //   if (data.userIdentity.type === 'IAMUser') {
  //     userName = data.userIdentity.userName;
  //   } else if (data.userIdentity.type === 'AssumedRole') {
  //     const principalIdParts = data.userIdentity.principalId.split(':');
  //     if (principalIdParts.length > 1) {
  //       userName = principalIdParts[1];
  //     }
  //   }

  //   // CreateDeployment
  //   switch (data.eventName) {
  //     case 'CreateDeployment':
  //       if (data.requestParameters?.restApiId) {
  //         resourceType.push('AWS::ApiGateway::RestApi');
  //         resourceName.push(data.requestParameters.restApiId);
  //       }
  //       if (data.requestParameters?.createDeploymentInput?.stageName) {
  //         resourceType.push('AWS::ApiGateway::Stage');
  //         resourceName.push(data.requestParameters.createDeploymentInput.stageName);
  //       }
  //       break;

  //     case 'UpdateFunctionCode20150331v2':
  //       if (data.responseElements?.functionName) {
  //         resourceType.push('AWS::Lambda::Function');
  //         resourceName.push(data.responseElements.functionName);
  //       }
  //       break;

  //     case 'AssumeRole':
  //       if (data.responseElements?.credentials?.accessKeyId) {
  //         resourceType.push('AWS::IAM::AccessKey');
  //         resourceName.push(data.responseElements.credentials.accessKeyId);
  //       }
  //       if (data.requestParameters?.roleSessionName) {
  //         resourceType.push('AWS::STS::AssumedRole');
  //         resourceName.push(data.requestParameters.roleSessionName);
  //       }
  //       if (data.requestParameters?.roleArn) {
  //         resourceType.push('AWS::IAM::Role');
  //         resourceName.push(data.requestParameters.roleArn);
  //       }
  //       if (data.responseElements?.assumedRoleUser?.assumedRoleId) {
  //         resourceType.push('AWS::IAM::AssumedRole');
  //         resourceName.push(data.responseElements.assumedRoleUser.assumedRoleId);
  //       }
  //       if (data.responseElements?.assumedRoleUser?.arn) {
  //         resourceType.push('AWS::IAM::AssumedRole');
  //         resourceName.push(data.responseElements.assumedRoleUser.arn);
  //       }
  //       break;

  //     case 'PutBucketPolicy':
  //       if (data.requestParameters?.bucketName) {
  //         resourceType.push('AWS::S3::Bucket');
  //         resourceName.push(data.requestParameters.bucketName);
  //       }
  //       break;

  //     case 'RetireGrant':
  //       if (data.resources[0].type === 'AWS::KMS::Key') {
  //         resourceType.push('AWS::KMS::Key');
  //         resourceName.push(data.resources[0].ARN);
  //       }
  //       break;
  //   }

  //   return {
  //     eventName: data.eventName,
  //     eventTime: data.eventTime,
  //     userName: userName,
  //     eventSource: data.eventSource,
  //     resourceType: resourceType,
  //     resourceName: resourceName,
  //     awsRegion: data.awsRegion,
  //     eventID: data.eventID,
  //     sourceIPAddress: data.sourceIPAddress,
  //     requestID: data.requestID || null,
  //     eventType: data.eventType,
  //   };
  // });
}
