

export default function getError(errors, name) {

  const result = errors?.find(x=> x.param ===name)
  console.log({result})
  return result? result.msg : ""
}