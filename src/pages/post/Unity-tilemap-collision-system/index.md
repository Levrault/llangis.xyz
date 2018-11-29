---
path: "/unity-tilemap-and-collision"
date: "2018-07-05T10:15:00.962Z"
title: "Unity, Tilemaps and collision"
thumbnail: "./thumbnail.png"
---

Tilemaps are a very common technique in 2D development. It's consists of regrouping level, theme or items in the same regular shaped image. It makes it easier to build a consistent 2D game world and made game development more accessible, faster and optimized.

Since Unity 2017.2, tilemap has finally become a part of the Unity 2D integrate dev tool. Before this version, you needed your own custom tilemap system. 

Sadly Unity still needs some time to optimize its tilemap features since they are still a few bugs remaning from previous versions (tilemap palette doesn't show, brushes are not optimized etc.). 

It's also missing some explanations about the tilemaps collision system in the case of a 2d platformer.

## Improving collision system 

### Context

For example, you are muaking a 2d platformer like Super Mario Bros. First of all, you create your spritesheet and decide to add it to nity. After importing your sprite sheet, you create your first tilemap. By doing this, Unity creates a Timemap object within a Grid object. Since you know that, this tilemap will be used to collide with your character, you also add a TilemapCollider2d component to it. It seems logical since the name is clearly made to manage collisions.



![image-20180705094050689](./grid-tilemap.png)



### Create

Great ! You can now easily create your own game world. You select the brush icon, create a small platform, add your character and voilà. You have your first implementation of your game.

![image-20180705094308623](./game-world.png)



### To many colliders

Even if everything looks fine, if you take a closer look at your tilemap, you will see that there are a lot of colliders. TilemapCollider2D is pretty simple, it creates a collider for every tile. For example, if you put 6 tiles one after the other, you will get a 6 box collider. All those colliders can be painfull as your character can trip over the junction between two colliders.

![image-20180705094544485](./collider-2d.png)



### A solution ?

The best solution is to add a CompositeCollider2D to your tilemap. You will also need RigidBody2D by the way, as CompositeCollider2D needs a rigidbody to work properly. Set the body type of the RigidBody2D to static because you don't want your tilemap to be impacted by the physic.

![image-20180705095233105](./composite.png)

But what is the role of a CompositeCollider2D ? It's pretty simple, a CompositeCollider2D will merge every box collider that has a junction with another one. To make it clear, in our first example below, when we have 6 box colliders for 6 tiles, now we will have only a single collider for the 6 tiles.

![image-20180705095410544](./tilemap-merge.png)



### But what happens when the collider shape isn't good ? 

Or maybe you want a more complex collision physics shape ? There's already a solution for that. You just need to edit the physics shapes of your sprite in the sprite editor windows.

![physics.gif](./physics.gif)



## Conclusion

Unity's tilemap system can help you save a lot of time but it still needs some tweaking to get want you really want.
