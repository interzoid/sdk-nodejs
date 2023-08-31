## interzoid-sdk-typescript

### Installation
```shell
npm install interzoid
```

### Usage
```typescript
import { getFullNameMatchKey } from 'interzoid';

async function testGetFullNameMatchKey() {
    const result = await getFullNameMatchKey({apiKey: 'your-interzoid-api-key', fullName: 'John Smith'});
    console.log(result);
}
```

#### Result

```json
{
  "simKey": "N1Ai4RfV0SRJf2dJwDO0Cvzh4xCgQG",
  "code": "Success",
  "credits": "9999"
}
```


