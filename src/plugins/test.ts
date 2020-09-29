

function Test(props: any) {

  const add = () => {
    console.log("add")
  }

  return `
    <div>
      <button onclick=${add}>测试</button>
    </div>
  `
}