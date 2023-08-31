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
  "simKey": "SMTHJHNN",
  "code": "Success",
  "credits": "9999"
}
```


