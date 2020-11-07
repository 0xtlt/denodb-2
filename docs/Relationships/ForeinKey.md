# Relationships - Foreign key

Foreign keys are the basics for modelizing relationships between entities.

In this guide, we will consider the following two entities:

```yaml
owner:
  - id
  - name

business:
  - id
  - name
```

We want to associate each business to an owner.

If a business is deleted, it should not delete the owner as it is just a one-way binding.

## Create models

Let's first create our models :

```typescript
import { Model } from "https://raw.githubusercontent.com/techtastet/denodb-2/main/mod.ts";

class Owner extends Model {
  static table = "owners";

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };
}

class Business extends Model {
  static table = "businesses";

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };
}
```

## Model belongs to...

To explicitely indicate that `Business` belongs to `Owner`, we need to add an additional field. We will call it `ownerId`, following the naming convention :

```typescript
import { Relationships } from "https://raw.githubusercontent.com/techtastet/denodb-2/main/mod.ts";

class Business extends Model {
  // ...

  static fields = {
    // ...
    ownerId: Relationships.belongsTo(Owner),
  };
}
```

This will make `ownerId` a foreign key based on `Owner.id` primary key.

## Add a querying method to our model

On the receiving model `Owner`, we will add a method to simply fetch a business which is associated to :

```typescript
class Business extends Model {
  // ...

  // Fetch an owner binded to this business
  static owner() {
    return this.hasOne(Owner);
  }
}
```

## Create models' values

After linking and syncing our models with the database, we can now create some values:

```typescript
await Owner.create({
  id: "1",
  name: "John",
});

await Business.create({
  id: "1",
  name: "Parisian Café",
  ownerId: "1",
});
```

## Query models

To query our models, we can now use the methods we created in the first place:

```typescript
await Business.where("id", "1").owner();
// { id: "1", name: "John" }
```

## Example

```typescript
import {
  Database,
  DataTypes,
  Model,
  Relationships,
} from 'https://raw.githubusercontent.com/techtastet/denodb-2/main/mod.ts';

const db = new Database(...);

class Owner extends Model {
  static table = "owners";

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  };
}

class Business extends Model {
  static table = "businesses";

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    ownerId: Relationships.belongsTo(Owner),
  };

  static owner() {
    return this.hasOne(Owner);
  }
}

db.link([Owner, Business]);

await db.sync({ drop: true });

await Owner.create({
  id: "1",
  name: "John",
});

await Business.create({
  id: "1",
  name: "Parisian Café",
  ownerId: "1",
});

await Business.where("id", "1").owner();

await db.close();
```
