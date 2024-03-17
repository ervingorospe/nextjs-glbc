// const url = process.env.REACT_APP_NEXT_API
const url = process.env.REACT_APP_FLUX_API

export const getItem = async (ids) => {
  try {
    const { items } = await (await fetch(`${url}?item=${ids}&fields=items{id,parentId,name,fields,file,sectionItems}}`)).json()

    return items
  } catch (error) {

    return error;
  }
}