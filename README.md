### bucket rules

https://dev.to/itnext/how-to-do-image-upload-with-firebase-in-react-cpj

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```
