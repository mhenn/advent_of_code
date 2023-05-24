import * as fs from 'fs'
import * as readline from 'readline'


type File = {

     name: string,
     type:string,
     dirs:File[],
     files:File[]
     size: number,
     parent: File

}

const getLinesFromFile = (fileName: string)=>{
    return readline.createInterface({input: fs.createReadStream(fileName)})
}


const newFile = (name:string, parent=null, type='D', size=0) => {
    return {name: name, type:type,dirs:[],files:[], size: size, parent:parent}
}

const navigateUp = (directory: File) => {
    if(directory.parent != null )
        return directory.parent
    directory

}

const navigateToRoot = (directory: File) => {

    while(directory.parent )
        directory = navigateUp(directory)
    return directory
}


const navigateTo = (directory: File, arg:string) => {
    let subDir = directory.dirs.find((e) => e.name == arg)
    if(subDir)
        return subDir
    return directory

}

const handleCD = (directory: File, commandString:string[]) => {
    if (commandString[0] == 'cd'){
        let arg = commandString[1]
        switch(arg){
            case '/':
                return navigateToRoot(directory)
            case '..':
                return navigateUp(directory)
            default:
                return navigateTo(directory, arg)
        }
    }
    return directory
}

const handleLS = (directory: File, commandString: string[]) => {
    let [left,right] = commandString
    if(left == 'dir')
        directory.dirs.push(newFile(right,directory))
    else
        directory.files.push(newFile(right,directory,'F',parseInt(left)))
    return directory
}

const calculateSize = (directory: File) => {

    if(directory.dirs.length == 0){
        directory.size = directory.files.reduce((acc,e) => acc + e.size,0)
        return directory
    }

    for(let sub of directory.dirs){
        calculateSize(sub)
    }
    let dirSize = directory.dirs.reduce((acc,e) => acc+e.size,0)
    directory.size = directory.files.reduce((acc,e) => acc + e.size,0) + dirSize
    return directory
}

const memBySize = ( max:number) => {

    return (directory: File) => {
        return directory.size <= max ? [directory] : []
    }
}


const memNotIncludes = ( dirs:File[]) =>{

    return (directory: File) => {
        return !dirs.includes(directory) ?  [directory] : []
    }
}



const getFolderOf = (directory: File, fn) => {
    let result = fn(directory) // directory.size <= max ? [directory] : []


    if (directory.dirs.length == 0)
        return result

    for(let sub of directory.dirs)
        result = result.concat(getFolderOf(sub,fn))

    return result
}

const getSmallestFitting = (dirs:File[], currentSize: number) =>{
    dirs = dirs.filter((e) => e.size + currentSize >= 30000000  )
    dirs.sort((a,b) => a.size - b.size)
    console.log(dirs[0].size)
}

const task = async (rl) =>{

    let directory = newFile("/")
    let executing = false
    let command = []

    for await (let line of rl){
       command = line.split(" ")
       //ls can be ignored since only the following lines are relevant
       if(command[0] == '$')
            directory = handleCD(directory,command.slice(1))
        else
            directory = handleLS(directory, command)
    }
    directory = navigateToRoot(directory)
    calculateSize(directory)
    let ofSize = memBySize(100000)
    let folders = getFolderOf(directory,ofSize)
    let notIncludes = memNotIncludes(folders)
    folders = getFolderOf(directory,notIncludes)
    getSmallestFitting(folders, 70000000 - directory.size)
    //console.log(folders.reduce((acc,e) => acc+e.size,0))

}


task( getLinesFromFile('./static/input'))

