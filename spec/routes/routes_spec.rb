describe "Routes", type: :routing do

  it 'Routes to Root path' do
    expect(:get => '/').to route_to(:controller => 'main', :action => 'show')
  end

end
