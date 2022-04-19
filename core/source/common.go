package source

import "novel/core/model"

type Fetcher interface {
	Search(word string) (*[]model.Search, error)
	FetchNovel(url string) (*model.Novel, error)
	FetchChapter(url string) (*model.Chapter, error)
}