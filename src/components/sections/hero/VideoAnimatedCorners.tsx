import {motion} from "framer-motion"

const VideoAnimatedCorners = () => {
  return (
    <>
     <motion.div
                    className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-[#FF1D57] rounded-tl-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(255, 29, 87, 0)",
                        "0 0 20px rgba(255, 29, 87, 0.5)",
                        "0 0 0px rgba(255, 29, 87, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-[#993EF9] rounded-tr-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(153, 62, 249, 0)",
                        "0 0 20px rgba(153, 62, 249, 0.5)",
                        "0 0 0px rgba(153, 62, 249, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-[#993EF9] rounded-bl-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(153, 62, 249, 0)",
                        "0 0 50px rgba(153, 62, 249, 0.5)",
                        "0 0 0px rgba(153, 62, 249, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  <motion.div
                    className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-[#FF1D57] rounded-br-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(255, 29, 87, 0)",
                        "0 0 50px rgba(255, 29, 87, 0.5)",
                        "0 0 0px rgba(255, 29, 87, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  />
                  </>
  )
}

export default VideoAnimatedCorners