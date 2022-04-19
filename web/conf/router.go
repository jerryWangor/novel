package conf

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"novel/core/model"
	"novel/web/util"
)

var Router = newRouter()

func newRouter() *mux.Router {
	router := mux.NewRouter()
	return router
}

// 定义路由
type Route struct {
	Match string
	Methods []string
	HandleFuncName string
	HandleFunc http.HandlerFunc
}

type Routes []Route

// 定义控制器
type Controller struct {
	Name string
	Path string
	Routes *Routes
}

// 注册控制器
func RegisterController(controller *Controller) {
	path := controller.Path
	log.Printf("register controller: %s.\n", controller.Name)
	routes := controller.Routes
	for _, route := range *routes {
		match := path + route.Match // /novel/search/
		methods := route.Methods // GET POST ...
		handleFuncName := route.HandleFuncName
		// 包装打印log 中间件
		handleFunc := LoggerHandlerFunc(route.HandleFunc, handleFuncName)
		// 包装跨域 中间件
		handleFunc = CorsHandlerFunc(handleFunc)
		log.Printf("register route: %s\t%s\t%s.\n", methods, match, handleFuncName)
		Router.HandleFunc(match, handleFunc).Methods(methods...)
	}
}

type NotFoundHandler struct {
}

func (n NotFoundHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	AllowCors(w)
	w.Write(util.ToJsonByte(model.NotFound()))
}

func StaticResource(pathPrefix string) {
	// 设置路由前缀一般路有分组才会使用
	Router.PathPrefix(pathPrefix).Handler(http.FileServer(http.Dir(".")))
}

func UseNotFound() {
	Router.NotFoundHandler = NotFoundHandler{}
}