class Particle{
    constructor(){
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        for (let a=0; a<360; a+=1){
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }


    show(){
        fill(255);
        for (let ray of this.rays){
            ray.show();
        }
    }

    drawRays(walls){
        for (let ray of this.rays){
            // if ray cross walls we found closest intersection
            // and then draw line 
            let closestRay = null;
            let record = Infinity;
            for (let wall of walls){
                const pt = ray.checkIntersection(wall);
                if (pt){
                    const d =  p5.Vector.dist(this.pos, pt);
                    if (d < record){
                        record = d;
                        closestRay = pt;
                    }                 
                }
            }
            if (closestRay){
                line(this.pos.x, this.pos.y, closestRay.x, closestRay.y);
            }
        }
    }

    update(x, y){
        this.pos.set(x, y);
    }
}