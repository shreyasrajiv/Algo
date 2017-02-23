class QuickUnionPathCompressionUF {
    this.id = [];
    this.count = 0;

    constructor(n) {
        this.count = n;
        for (var i = 0; i < n; i++) {
            this.id.push(i);
        }
    }

    count() {
        return this.count;
    }

    find(p) {
        var root = p;
        while (root !== this.id[root]) {
            root = this.id[root];
        }
        while (p !== root) {
            var newp = this.id[p];
            this.id[p] = root;
            p = newp;
        }
        return root;
    }

    connected(p, q) {
        return this.find(p) === this.find(q);
    }

    union(p, q) {
        var i = this.find(p);
        var j = this.find(q);
        if (i === j) {
            return;
        }
        this.id[i] = j;
        this.count--;
    }
}