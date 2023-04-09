const checkDiscount = (name: string) => {
    if (name === 'milk') {
        return true
    }
    return false
}

const calculateThePrice = (goods: any, checkDiscount: any)=> {
    let totalPrice = 0
    goods.forEach((item: any) => {
        // 先計算原價
        let price = Number(item.price) * Number(item.count)

        // 如果有折扣要半價
        if (checkDiscount(item.name)) {
            price *= 0.5
        }

        // 將價格加到總合上
        totalPrice += price
    })
    return totalPrice
}


describe('Test calulate the price', () => {
    // 創建一個產品物件提供測試
    const shoppingCart = [
        { name: 'milk', price: 39, count: 2 },
        { name: 'apple', price: 25, count: 3 },
    ]

    // 建立 Mock 取代 CheckDiscount
    const mockCheckDiscount = jest.fn()
    // 設定回傳值
    mockCheckDiscount
        .mockReturnValueOnce(true)
        .mockReturnValue(false)

    test('Test can return expect price', () => {
        expect(calculateThePrice(shoppingCart,mockCheckDiscount)).toBe(114)
    })
    
    test('Test can return expect price', () => {
        // 確認期望是否正確
        expect(mockCheckDiscount.mock.calls.length).toBe(2)
    })

})