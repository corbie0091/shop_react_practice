import { Table } from "react-bootstrap"
import { useSelector } from "react-redux";

function Cart() {

    let a = useSelector((state) => {return state})
    let state = useSelector((state) => { return state})
    let prchs = useSelector((state) => state.prchs)
    console.log(prchs)
    return (
        <div>
            <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>안녕</td>
                    <td>안녕</td>
                    <td>안녕</td>
                </tr>
                <tr>
                    <td>{prchs[0].id+2}</td>
                    <td>{prchs[0].name}</td>
                    <td>{prchs[0].count}</td>
                    <td>no</td>
                </tr>
                <tr>
                    <td>{prchs[1].id+2}</td>
                    <td>{prchs[1].name}</td>
                    <td>{prchs[1].count}</td>
                    <td>yes</td>
                </tr>
            </tbody>
            </Table>
        </div>
    )
}

export default Cart;