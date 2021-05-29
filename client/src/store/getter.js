/**
  @desc 集合所有 module 的 getters
*/
const getters = {
  user: state => state.login.user,
  avatar: state => state.login.avatar,
  jwt: state => state.login.jwt,
  roles: state => state.permission.addRoutes,
  members: state => state.member.members,
  memberOne: stat => stat.member.memberOne,
  filterMembers: state => state.member.filterMembers,
  motos: state => state.motoHouse.motos,
  seletMotos: state => state.motoHouse.seletMotos,
  seletMotosCatalog: state => state.motoHouse.seletMotosCatalog,
  seletMotoName: state => state.motoHouse.seletMotoName,
  seletCC: state => state.motoHouse.cc,
  seletDataCatalog: state => state.motoHouse.seletDataCatalog,
  seletDataNum: state => state.motoHouse.seletDataNum,
  seletHomeMotos: state => state.motoHouse.seletHomeMotos,
  seletHomeCC: state => state.motoHouse.seletHomeCC,
  selectHomeMotoOne: state => state.motoHouse.selectHomeMotoOne,
  stores: state => state.store.stores,
  selectStores: state => state.store.selectStores,
  orders: state => state.order.orders,
  selectOrders: state => state.order.selectOrders,
  undoneNumbers: state => state.order.undoneNumbers,
  ordersOne: state => state.order.ordersOne
}

export default getters
