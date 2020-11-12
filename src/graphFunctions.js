const Ls_to_U = (n, m, poz, succ) => {
    let nod = 1
    let a = [];
    let b = [];
    let contor = 0;
    for (let i = 0; i < n; i++) {
        for (let j = poz[i] - 1; j < poz[i + 1] - 1; j++) {
            a[contor] = nod;
            b[contor] = succ[j];
            contor++;
        }

        nod++;
    }

    let rez;
    rez = {
        from: a,
        to: b
    }
    

    return rez;
}

const Ls_to_B = (n, m, poz, succ) => {
    let nod = 0;
    let rez = [];
    let inc = Array.from({
        // generate array of length m
        length: 15
        // inside map function generate array of size n
        // and fill it with `0`
    }, () => new Array(15).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = poz[i] - 1; j < poz[i + 1] - 1; j++) {
            inc[nod][j] = 1;
            inc[succ[j] - 1][j] = -1;
        }
        nod++;
    }
    for (let i = 0; i < n; i++) {
        let line = [];
        for (let j = 0; j < m; j++) {
            if (inc[i][j] != -1)
                line.push(inc[i][j]);
            else
                line.push(inc[i][j]);
        }
        rez.push(line)
    }
    return rez;
}

const Ls_to_A = (n, m, poz, succ) => {
    let nod = 0;
    let rez = [];
    let ad = Array.from({
        // generate array of length m
        length: 15
        // inside map function generate array of size n
        // and fill it with `0`
    }, () => new Array(15).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = poz[i] - 1; j < poz[i + 1] - 1; j++) {
            ad[nod][succ[j] - 1] = 1;
            // cout << "nod=" << nod << " j=" << j << endl;
        }
        nod++;
    }
    for (let i = 0; i < n; i++) {
        let line = [];
        for (let j = 0; j < n; j++) {
            line.push(ad[i][j]);
        }
        rez.push(line);
    }

    return rez;
}

export const Ls_to_all = (data) => {
    let n = data.pozitie.length;
    let m = data.succesori.length;
    let poz = data.pozitie;
    let succ = data.succesori;

    

    return {
        incidenta: Ls_to_B(n, m, poz, succ),
        arce: Ls_to_U(n, m, poz, succ),
        adiacenta: Ls_to_A(n, m, poz, succ),
        //TODO predecesori: TODO
    }
    
    
    
}

const U_to_Lp = (n, m, a, b) => {
    let poz = [];
    let pred = [];
    let aux = 0;
    let aux2 = 0;
    let rez;
    if (m > 0) {
        poz[0] = 1;
        aux2++;
    }
    for (let i = 0; i < m - 1; i++) {
        if (b[i] == b[i + 1]) {
            pred[aux++] = a[i];
            pred[aux++] = a[i + 1];
        }
        else {
            pred[aux++] = a[i];
        }
        poz[aux2++] = aux + 1;
    }
    poz[aux2] = aux + 1;


    rez = {
        pozitia: poz,
        predecesori: pred
    }

    return rez;
}

const U_to_Ls = (n, m, a, b) => {
    let poz = []
    let succ = []
    let aux = 0
    let aux2 = 0
    let nod = 0;
    if (m > 0) {
        poz[aux2++] = 1;
    }
    for (let i = 0; i < m; i++) {
        if (a[i] != nod) {
            nod = a[i];
            for (let j = 0; j < m; j++) {
                if (a[j] == nod) {
                    succ[aux++] = b[j];
                    aux2++;
                }
            }
            poz[aux2++] = aux;
        }

    }
    poz[aux2] = aux;

    let rez;
    rez = {
        pozitia: poz,
        succesori: succ
    }

    return rez;
}

const U_to_B = (n, m, a, b) => {
    let inc = Array.from({
        // generate array of length m
        length: 15
        // inside map function generate array of size n
        // and fill it with `0`
    }, () => new Array(15).fill(0));
    for (let i = 0; i < m; i++) {
        inc[a[i] - 1][i] = 1;
        inc[b[i] - 1][i] = -1;
    }

    let rez = []
    for (let i = 0; i < n; i++) {
        let line = []
        for (let j = 0; j < m; j++) {
            if (inc[i][j] != -1)
                line.push(inc[i][j]);
            else line.push(inc[i][j]);
        }
        rez.push(line);

    }
    return rez;
}

const U_to_A=(n, m, a, b)=>{
    let ad = Array.from({
        // generate array of length m
        length: 15
        // inside map function generate array of size n
        // and fill it with `0`
    }, () => new Array(15).fill(0));
    for (let i = 0; i < m; i++) {
        ad[a[i] - 1][b[i] - 1] = 1;
    }

    let rez=[]
    for (let i = 0; i < n; i++) {
        let line = []
        for (let j = 0; j < n; j++) {
            line.push(ad[i][j]);
        }
        rez.push(line);

    }
    return rez;
}


export const U_to_all=(arce,n)=>{
    let m=arce.to.length
    let a = arce.from
    let b = arce.to;

    return {
        incidenta:  U_to_B(n, m, a, b),
        succesori: U_to_Ls(n, m, a, b),
        adiacenta:  U_to_A(n, m, a, b),
        predecesori: U_to_Lp(n, m, a, b),
    }
}

const B_to_Lp=(n, m, a)=>{
    let aux = 0;
    let aux2 = 0;
    let poz = [];
    let succ = [];
    let ok = 0;
    poz[0] = 1;
    aux2++;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (a[i][j] == -1) {
                for (let c = 0; c < n; c++) {
                    if (a[c][j] == 1) {

                        succ[aux] = c + 1;
                        aux++;
                        ok = 1;
                    }
                }


            }
        }
        if (ok != 0) {
            poz[aux2] = aux + 1;
            aux2++;
            ok = 0;
        }

    }
    poz[aux2] = aux + 1;

    let rez;
    rez = {
        pozitia:poz,
        predecesori: succ
    }
   return rez;
}

const B_to_Ls=(n, m, a)=>{
    let aux = 0;
    let aux2 = 0;
    let poz = [];
    let succ = [];
    poz[0] = 1;
    aux2++;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {

            if (a[i][j] == 1) {
                for (let c = 0; c < n; c++) {
                    if (a[c][j] == -1) {

                        succ[aux] = c + 1;
                        aux++;
                    }
                }


            }
        }
        poz[aux2] = aux + 1;
        aux2++;
    }
    poz[aux2] = aux;

    let rez;
    rez= {
        pozitia: poz,
        succesori: succ
    }

    return rez;
}

const B_to_U=(n, m, a)=>{
    let list1 = Array.from({
        // generate array of length m
        length: 15
        // inside map function generate array of size n
        // and fill it with `0`
    }, () => new Array(15).fill(0));
    let list2 = Array.from({
        // generate array of length m
        length: 15
        // inside map function generate array of size n
        // and fill it with `0`
    }, () => new Array(15).fill(0));
    let poz = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (a[i][j] == 1) {
                for (let c = 0; c < n; c++) {
                    if (a[c][j] == -1) {

                        list1[poz] = i + 1;
                        list2[poz] = c + 1;
                        poz++;
                    }
                }
            }
        }
    }
    let rez = [];
    rez = {
        from: list1,
        to: list2
    }
    
    return rez;

}

const B_to_A = (n, m, a)=>{
    let b = Array.from({
        // generate array of length m
        length: 15
        // inside map function generate array of size n
        // and fill it with `0`
    }, () => new Array(15).fill(0));
    
    let rez = [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (a[i][j] == 1) {
                for (let c = 0; c < n; c++) {
                    if (a[c][j] == -1) {
                        b[i][c] = 1;
                    }
                }
            }
        }
    }
    for (let i = 0; i < n; i++) {
        let line = [];
        for (let j = 0; j < n; j++) {
            line.push(b[i][j]);
        }
        rez.push(line);
    }
    return rez;
}

const B_to_B=(n, m, a)=>{
    let rez = [];
    for (let i = 0; i < n; i++) {
        let line = [];
        for (let j = 0; j < m; j++) {
            if (a[i][j] != -1)
                line.push(a[i][j]);
            else line.push(a[j][i]);
        }
        rez.push(line);
    }
    
    return rez;
}

export const B_to_all=(matrix)=>{

    let n = matrix.length;
    let m = matrix[0]?.length;
    let a = matrix;

    return {
        adiacenta: B_to_A(n, m, a),
        arce: B_to_U(n, m, a),
        succesori: B_to_Ls(n, m, a),
        predecesori: B_to_Lp(n, m, a),
    }
}

const A_to_Lp = (n, m, a) => {
    let aux = 0;
    let aux2 = 0
    let poz = [];
    let pred = []
    let contor = 0;
    poz[0] = 1;
    aux2++;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (a[j][i] == 1) {
                pred[aux] = j + 1;
                aux++;
                contor++;
            }
        }
        if (contor != 0) {
            poz[aux2] = aux + 1;
            aux2++;
        }
        contor++;
    }
    poz[aux2] = aux + 1;
    let rez = {
        pozitia: poz,
        predecesori: pred
    }

    return rez;

}

const A_to_Ls = (n, m, a) => {
    let aux = 0;
    let aux2 = 0;
    let poz = [];
    let succ = [];
    poz[0] = 1;
    aux2++;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (a[i][j] == 1) {
                succ[aux] = j + 1;
                aux++;
            }
        }

        poz[aux2] = aux + 1;
        aux2++;
    }
    poz[aux2] = aux;

    let rez = {
        pozitia: poz,
        succesori: succ
    }

    return rez;

}

const A_to_U = (n, a) => {
    let u = 0;
    let b = [];
    let c = [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (a[i][j] == 1) {
                b[u] = i + 1;
                c[u] = j + 1;
                u++;
            }
        }
    }
    let rez = {
        from: b,
        to: c
    }

    return rez;
}

const A_to_B = (n, m, a) => {
    let u = 0;
    let rez = [];
    let b = Array.from({
        // generate array of length m
        length: 15
        // inside map function generate array of size n
        // and fill it with `0`
    }, () => new Array(15).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (a[i][j] == 1) {
                for (let p = 0; p < n; p++) {
                    b[u][p] = 0;
                }
                b[u][i] = 1;
                b[u][j] = -1;
                u++;
            }
        }
    }

    for (let i = 0; i < n; i++) {
        let line = []
        for (let j = 0; j < m; j++) {
            if (b[j][i] != -1)
                line.push(b[j][i]);
            else line.push(b[j][i]);
        }
        rez.push(line);
    }

    return rez;
}

export const A_to_all = (matrix) => {

    let n = matrix.length;
    let m = matrix[0]?.length;
    let a = matrix;

    return {
        incidenta: A_to_B(n, m, a),
        arce: A_to_U(n, a),
        succesori: A_to_Ls(n, m, a),
        predecesori: A_to_Lp(n, m, a),
    }
}
