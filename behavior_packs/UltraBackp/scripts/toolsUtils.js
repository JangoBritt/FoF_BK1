export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export class InventoryUtils {
    static CalculateAdd(add, stored, limit) {
        const clampedAmountFinal = clamp(stored + add, 0, limit);
        const remaining = clamp(add - (limit - stored), 0, limit);
        const realAddValue = clamp(add - remaining, 0, limit);

        return {
            final_amount: clampedAmountFinal,
            amount_add: realAddValue,
            remain_amount: remaining
        };
    }
}

export class DynamicProperty {
    constructor(entity, id) {
        this.entity = entity;
        this.id = id;
    }

    set(value) {
        if (this.entity) {
            this.entity.setDynamicProperty(this.id, value);
        }
        return this.get();
    }

    get() {
        return this.entity ? this.entity.getDynamicProperty(this.id) : undefined;
    }
}

export class Vector3 {
    constructor(x, y, z) {
        if (typeof x === "object") {
            this.x = x.x || 0;
            this.y = x.y || 0;
            this.z = x.z || 0;
        } else if (typeof x === "number") {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        }
    }

    add(x, y, z) {
        const vec2 = typeof x === "object" ? x : new Vector3(x, y, z);
        return new Vector3(this.x + vec2.x, this.y + vec2.y, this.z + vec2.z);
    }

    mul(x, y, z) {
        const vec2 = typeof x === "object" ? x : new Vector3(x, y, z);
        return new Vector3(this.x * vec2.x, this.y * vec2.y, this.z * vec2.z);
    }
}
